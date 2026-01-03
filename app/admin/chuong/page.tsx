'use client';

import React, { useEffect, useState } from 'react';
import { chuongService, Chuong } from '@/app/admin/services/chuongService';

export default function ChuongManagementPage() {
    const [chuongs, setChuongs] = useState<Chuong[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [processingId, setProcessingId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editingChuong, setEditingChuong] = useState<Chuong | null>(null);
    const [formData, setFormData] = useState({ TenChuong: '', ThuTu: 0 });

    const fetchChuongs = async () => {
        try {
            setLoading(true);
            const data = await chuongService.getAll();
            setChuongs(data);
        } catch (error) {
            console.error(error);
            alert('Không thể tải danh sách chương');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChuongs();
    }, []);

    const handleCreate = () => {
        setEditingChuong(null);
        setFormData({ TenChuong: '', ThuTu: chuongs.length + 1 });
        setShowModal(true);
    };

    const handleEdit = (chuong: Chuong) => {
        setEditingChuong(chuong);
        setFormData({ TenChuong: chuong.TenChuong, ThuTu: chuong.ThuTu });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingChuong) {
                await chuongService.update(editingChuong.ID_Chuong, formData);
            } else {
                await chuongService.create(formData);
            }
            setShowModal(false);
            await fetchChuongs();
        } catch (error) {
            alert('Có lỗi xảy ra khi lưu chương');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa chương này? Tất cả bài học và câu hỏi bên trong sẽ bị xóa!')) return;

        setProcessingId(id);
        try {
            await chuongService.delete(id);
            await fetchChuongs();
        } catch (error) {
            alert('Có lỗi xảy ra khi xóa chương');
        } finally {
            setProcessingId(null);
        }
    };

    const filteredChuongs = chuongs.filter(chuong =>
        chuong.TenChuong && chuong.TenChuong.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="px-8 py-12 font-sans text-gray-800">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Quản Lý Chương</h1>
                    <button
                        onClick={handleCreate}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                    >
                        + Thêm Chương Mới
                    </button>
                </div>

                <div className="mb-10">
                    <input
                        type="text"
                        placeholder="Tìm kiếm chương..."
                        className="w-full max-w-md px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">ID</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Tên Chương</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Thứ Tự</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Ngày Tạo</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">Hành Động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center text-gray-500">
                                            Đang tải dữ liệu...
                                        </td>
                                    </tr>
                                ) : filteredChuongs.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center text-gray-500">
                                            Không tìm thấy chương nào
                                        </td>
                                    </tr>
                                ) : (
                                    filteredChuongs.map(chuong => {
                                        const isProcessing = processingId === chuong.ID_Chuong;

                                        return (
                                            <tr key={chuong.ID_Chuong} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-6 text-sm text-gray-600">{chuong.ID_Chuong}</td>
                                                <td className="px-6 py-6 text-sm font-medium text-gray-900">{chuong.TenChuong}</td>
                                                <td className="px-6 py-6 text-sm text-gray-600">{chuong.ThuTu}</td>
                                                <td className="px-6 py-6 text-sm text-gray-600">
                                                    {chuong.created_at
                                                        ? new Date(chuong.created_at).toLocaleDateString('vi-VN')
                                                        : '-'}
                                                </td>
                                                <td className="px-6 py-6 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleEdit(chuong)}
                                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                                                        >
                                                            Sửa
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(chuong.ID_Chuong)}
                                                            disabled={isProcessing}
                                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            {isProcessing ? 'Đang xóa...' : 'Xóa'}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            {editingChuong ? 'Sửa Chương' : 'Thêm Chương Mới'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên Chương
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.TenChuong}
                                    onChange={(e) => setFormData({ ...formData, TenChuong: e.target.value })}
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Thứ Tự
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.ThuTu}
                                    onChange={(e) => setFormData({ ...formData, ThuTu: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                                >
                                    {editingChuong ? 'Cập Nhật' : 'Tạo Mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
