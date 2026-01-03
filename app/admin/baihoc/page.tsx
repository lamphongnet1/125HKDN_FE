'use client';

import React, { useEffect, useState } from 'react';
import { baiHocService, BaiHoc } from '@/app/admin/services/baiHocService';
import { chuongService, Chuong } from '@/app/admin/services/chuongService';

export default function BaiHocManagementPage() {
    const [baiHocs, setBaiHocs] = useState<BaiHoc[]>([]);
    const [chuongs, setChuongs] = useState<Chuong[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [processingId, setProcessingId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editingBaiHoc, setEditingBaiHoc] = useState<BaiHoc | null>(null);
    const [formData, setFormData] = useState({ ID_Chuong: 0, TenBaiHoc: '', IconBaiHoc: '', ThuTu: 0 });

    const fetchData = async () => {
        try {
            setLoading(true);
            const [baiHocData, chuongData] = await Promise.all([
                baiHocService.getAll(),
                chuongService.getAll()
            ]);
            setBaiHocs(baiHocData);
            setChuongs(chuongData);
        } catch (error) {
            console.error(error);
            alert('Không thể tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = () => {
        setEditingBaiHoc(null);
        setFormData({ ID_Chuong: chuongs[0]?.ID_Chuong || 0, TenBaiHoc: '', IconBaiHoc: '', ThuTu: baiHocs.length + 1 });
        setShowModal(true);
    };

    const handleEdit = (baiHoc: BaiHoc) => {
        setEditingBaiHoc(baiHoc);
        setFormData({
            ID_Chuong: baiHoc.ID_Chuong,
            TenBaiHoc: baiHoc.TenBaiHoc,
            IconBaiHoc: baiHoc.IconBaiHoc,
            ThuTu: baiHoc.ThuTu
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingBaiHoc) {
                await baiHocService.update(editingBaiHoc.ID_BaiHoc, formData);
            } else {
                await baiHocService.create(formData);
            }
            setShowModal(false);
            await fetchData();
        } catch (error) {
            alert('Có lỗi xảy ra khi lưu bài học');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa bài học này?')) return;

        setProcessingId(id);
        try {
            await baiHocService.delete(id);
            await fetchData();
        } catch (error) {
            alert('Có lỗi xảy ra khi xóa bài học');
        } finally {
            setProcessingId(null);
        }
    };

    const filteredBaiHocs = baiHocs.filter(baiHoc =>
        baiHoc.TenBaiHoc && baiHoc.TenBaiHoc.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getChuongName = (id: number) => {
        return chuongs.find(c => c.ID_Chuong === id)?.TenChuong || 'N/A';
    };

    return (
        <div className="px-8 py-12 font-sans text-gray-800">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Quản Lý Bài Học</h1>
                    <button
                        onClick={handleCreate}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                    >
                        + Thêm Bài Học Mới
                    </button>
                </div>

                <div className="mb-10">
                    <input
                        type="text"
                        placeholder="Tìm kiếm bài học..."
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
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Tên Bài Học</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Chương</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Icon</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Thứ Tự</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">Hành Động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-16 text-center text-gray-500">
                                            Đang tải dữ liệu...
                                        </td>
                                    </tr>
                                ) : filteredBaiHocs.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-16 text-center text-gray-500">
                                            Không tìm thấy bài học nào
                                        </td>
                                    </tr>
                                ) : (
                                    filteredBaiHocs.map(baiHoc => {
                                        const isProcessing = processingId === baiHoc.ID_BaiHoc;

                                        return (
                                            <tr key={baiHoc.ID_BaiHoc} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-6 text-sm text-gray-600">{baiHoc.ID_BaiHoc}</td>
                                                <td className="px-6 py-6 text-sm font-medium text-gray-900">{baiHoc.TenBaiHoc}</td>
                                                <td className="px-6 py-6 text-sm text-gray-600">Chương: {baiHoc.ID_Chuong} - {getChuongName(baiHoc.ID_Chuong)}</td>
                                                <td className="px-6 py-6 text-sm text-gray-600">{baiHoc.IconBaiHoc}</td>
                                                <td className="px-6 py-6 text-sm text-gray-600">{baiHoc.ThuTu}</td>
                                                <td className="px-6 py-6 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleEdit(baiHoc)}
                                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                                                        >
                                                            Sửa
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(baiHoc.ID_BaiHoc)}
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
                            {editingBaiHoc ? 'Sửa Bài Học' : 'Thêm Bài Học Mới'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Chương
                                </label>
                                <select
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.ID_Chuong}
                                    onChange={(e) => setFormData({ ...formData, ID_Chuong: parseInt(e.target.value) })}
                                >
                                    {chuongs.map(chuong => (
                                        <option key={chuong.ID_Chuong} value={chuong.ID_Chuong}>
                                            {chuong.TenChuong}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên Bài Học
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.TenBaiHoc}
                                    onChange={(e) => setFormData({ ...formData, TenBaiHoc: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Icon
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ví dụ: 📚"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.IconBaiHoc}
                                    onChange={(e) => setFormData({ ...formData, IconBaiHoc: e.target.value })}
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
                                    {editingBaiHoc ? 'Cập Nhật' : 'Tạo Mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
