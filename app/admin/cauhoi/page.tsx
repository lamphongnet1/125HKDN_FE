'use client';

import React, { useEffect, useState } from 'react';
import { cauHoiService, CauHoi, LoaiCauHoi, PaginationMeta } from '@/app/admin/services/cauHoiService';
import { baiHocService, BaiHoc } from '@/app/admin/services/baiHocService';

const LOAI_CAU_HOI_OPTIONS: LoaiCauHoi[] = ['tracnghiem', 'dientu', 'chonanh', 'nghehoithoai', 'nghexepcau', 'video'];

export default function CauHoiManagementPage() {
    const [cauHois, setCauHois] = useState<CauHoi[]>([]);
    const [baiHocs, setBaiHocs] = useState<BaiHoc[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [processingId, setProcessingId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editingCauHoi, setEditingCauHoi] = useState<CauHoi | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
        current_page: 1,
        last_page: 1,
        per_page: 20,
        total: 0
    });
    const [formData, setFormData] = useState({
        ID_BaiHoc: 0,
        ThuTu: 0,
        LoaiCauHoi: 'tracnghiem' as LoaiCauHoi,
        dataJson: ''
    });

    const fetchData = async (page: number = 1) => {
        try {
            setLoading(true);
            const [cauHoiResponse, baiHocData] = await Promise.all([
                cauHoiService.getAll(page),
                baiHocService.getAll()
            ]);
            setCauHois(cauHoiResponse.data);
            setPaginationMeta(cauHoiResponse.meta);
            setBaiHocs(baiHocData);
        } catch (error) {
            console.error(error);
            alert('Không thể tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const handleEdit = async (id: number) => {
        try {
            const detail = await cauHoiService.getById(id);
            setEditingCauHoi(detail);

            // Extract data from dynamic field based on question type
            const questionData = detail[detail.LoaiCauHoi as keyof CauHoi];

            setFormData({
                ID_BaiHoc: detail.ID_BaiHoc,
                ThuTu: detail.ThuTu,
                LoaiCauHoi: detail.LoaiCauHoi,
                dataJson: JSON.stringify(questionData, null, 2)
            });
            setShowModal(true);
        } catch (error) {
            alert('Không thể tải chi tiết câu hỏi');
        }
    };

    const handleCreate = () => {
        setEditingCauHoi(null);
        setFormData({
            ID_BaiHoc: baiHocs[0]?.ID_BaiHoc || 0,
            ThuTu: cauHois.length + 1,
            LoaiCauHoi: 'tracnghiem',
            dataJson: JSON.stringify({ CauHoi: '', DapAnA: '', DapAnB: '', DapAnC: '', DapAnD: '', DapAnDung: '' }, null, 2)
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const parsedData = JSON.parse(formData.dataJson);
            if (editingCauHoi) {
                await cauHoiService.update(editingCauHoi.ID_Cau, {
                    ID_BaiHoc: formData.ID_BaiHoc,
                    ThuTu: formData.ThuTu,
                    LoaiCauHoi: formData.LoaiCauHoi,
                    data: parsedData
                });
            } else {
                await cauHoiService.create({
                    ID_BaiHoc: formData.ID_BaiHoc,
                    ThuTu: formData.ThuTu,
                    LoaiCauHoi: formData.LoaiCauHoi,
                    data: parsedData
                });
            }
            setShowModal(false);
            await fetchData(currentPage);
        } catch (error) {
            alert('Có lỗi xảy ra. Kiểm tra lại JSON data!');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) return;

        setProcessingId(id);
        try {
            await cauHoiService.delete(id);
            await fetchData(currentPage);
        } catch (error) {
            alert('Có lỗi xảy ra khi xóa câu hỏi');
        } finally {
            setProcessingId(null);
        }
    };

    const filteredCauHois = cauHois.filter(cauHoi =>
        cauHoi.LoaiCauHoi && cauHoi.LoaiCauHoi.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getBaiHocName = (id: number) => {
        return baiHocs.find(b => b.ID_BaiHoc === id)?.TenBaiHoc || 'N/A';
    };

    return (
        <div className="px-8 py-12 font-sans text-gray-800">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Quản Lý Câu Hỏi</h1>
                    <button
                        onClick={handleCreate}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                    >
                        + Thêm Câu Hỏi Mới
                    </button>
                </div>

                <div className="mb-10">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo loại câu hỏi..."
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
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Chương</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Bài Học</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Loại Câu Hỏi</th>
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
                                ) : filteredCauHois.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-16 text-center text-gray-500">
                                            Không tìm thấy câu hỏi nào
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCauHois.map(cauHoi => {
                                        const isProcessing = processingId === cauHoi.ID_Cau;

                                        return (
                                            <tr key={cauHoi.ID_Cau} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-6 text-sm text-gray-600">{cauHoi.ID_Cau}</td>
                                                <td className="px-6 py-6 text-sm text-gray-600">
                                                    Chương: {cauHoi.ID_Chuong} - {cauHoi.TenChuong || 'N/A'}
                                                </td>
                                                <td className="px-6 py-6 text-sm text-gray-600">
                                                    Bài học: {cauHoi.ID_BaiHoc} - {getBaiHocName(cauHoi.ID_BaiHoc)}
                                                </td>
                                                <td className="px-6 py-6 text-sm font-medium text-gray-900">
                                                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                                        {cauHoi.LoaiCauHoi}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-6 text-sm text-gray-600">{cauHoi.ThuTu}</td>
                                                <td className="px-6 py-6 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleEdit(cauHoi.ID_Cau)}
                                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                                                        >
                                                            Sửa
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(cauHoi.ID_Cau)}
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

                {/* Pagination */}
                {paginationMeta.last_page > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Hiển thị {cauHois.length} / {paginationMeta.total} câu hỏi
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                ← Trước
                            </button>
                            <div className="flex items-center gap-2">
                                {Array.from({ length: paginationMeta.last_page }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${currentPage === page
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(paginationMeta.last_page, prev + 1))}
                                disabled={currentPage === paginationMeta.last_page}
                                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                Sau →
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 my-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            {editingCauHoi ? 'Sửa Câu Hỏi' : 'Thêm Câu Hỏi Mới'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bài Học
                                </label>
                                <select
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.ID_BaiHoc}
                                    onChange={(e) => setFormData({ ...formData, ID_BaiHoc: parseInt(e.target.value) })}
                                >
                                    {baiHocs.map(baiHoc => (
                                        <option key={baiHoc.ID_BaiHoc} value={baiHoc.ID_BaiHoc}>
                                            Chương: {baiHoc.ID_Chuong} - Bài: {baiHoc.ID_BaiHoc} - {baiHoc.TenBaiHoc}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Loại Câu Hỏi
                                </label>
                                <select
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.LoaiCauHoi}
                                    onChange={(e) => setFormData({ ...formData, LoaiCauHoi: e.target.value as LoaiCauHoi })}
                                >
                                    {LOAI_CAU_HOI_OPTIONS.map(loai => (
                                        <option key={loai} value={loai}>{loai}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
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
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Data (JSON Object)
                                </label>
                                <textarea
                                    required
                                    rows={10}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                                    value={formData.dataJson}
                                    onChange={(e) => setFormData({ ...formData, dataJson: e.target.value })}
                                    placeholder='{"CauHoi": "...", "DapAnA": "...", ...}'
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Nhập JSON hợp lệ. Ví dụ trắc nghiệm: {`{"CauHoi": "...", "DapAnA": "...", "DapAnB": "...", "DapAnC": "...", "DapAnD": "...", "DapAnDung": "A"}`}
                                </p>
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
                                    {editingCauHoi ? 'Cập Nhật' : 'Tạo Mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
