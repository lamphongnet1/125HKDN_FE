'use client';

import React, { useEffect, useState } from 'react';
import { adminUserService, User } from '@/app/admin/services/adminUserService';

export default function UserManagementPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [processingId, setProcessingId] = useState<number | null>(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await adminUserService.getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error(error);
            alert('Không thể tải danh sách tài khoản');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleLock = async (id: number) => {
        if (!confirm('Bạn có chắc chắn muốn khóa tài khoản này?')) return;

        setProcessingId(id);
        try {
            await adminUserService.lockUser(id);
            await fetchUsers();
        } catch (error) {
            alert('Có lỗi xảy ra khi khóa tài khoản');
        } finally {
            setProcessingId(null);
        }
    };

    const handleRestore = async (id: number) => {
        if (!confirm('Bạn có chắc chắn muốn mở khóa tài khoản này?')) return;

        setProcessingId(id);
        try {
            await adminUserService.restoreUser(id);
            await fetchUsers();
        } catch (error) {
            alert('Có lỗi xảy ra khi mở khóa tài khoản');
        } finally {
            setProcessingId(null);
        }
    };

    const filteredUsers = users.filter(user =>
        (user.HoTen && user.HoTen.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.Email && user.Email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gray-50 px-8 py-12 font-sans text-gray-800">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Quản Lý Tài Khoản
                </h1>

                {/* Search */}
                <div className="mb-10">
                    <input
                        type="text"
                        placeholder="Tìm kiếm tài khoản..."
                        className="w-full max-w-md px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Table */}
                <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-100 sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">ID</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Họ Tên</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Email</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Điểm</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Giờ Online</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Ngày Tạo</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Trạng Thái</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Ngày bị khóa</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">Hành Động</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-16 text-center text-gray-500">
                                            Đang tải dữ liệu...
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-16 text-center text-gray-500">
                                            Không tìm thấy tài khoản nào
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map(user => {
                                        const isLocked = !!user.deleted_at;
                                        const isProcessing = processingId === user.ID_User;

                                        return (
                                            <tr
                                                key={user.ID_User}
                                                className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
                                            >
                                                <td className="px-6 py-6 text-sm text-gray-600">
                                                    {user.ID_User}
                                                </td>
                                                <td className="px-6 py-6 text-sm font-medium text-gray-900">
                                                    {user.HoTen}
                                                </td>
                                                <td className="px-6 py-6 text-sm text-gray-600">
                                                    {user.Email}
                                                </td>
                                                <td className="px-6 py-6 text-sm text-gray-600">
                                                    {user.Diem}
                                                </td>
                                                <td className="px-6 py-6 text-sm text-gray-600">
                                                    {user.SoGioOnline}
                                                </td>
                                                <td className="px-6 py-6 text-sm text-gray-600">
                                                    {user.created_at
                                                        ? new Date(user.created_at).toLocaleDateString('vi-VN')
                                                        : '-'}
                                                </td>
                                                <td className="px-6 py-6 text-sm">
                                                    {isLocked ? (
                                                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                                                            Đã khóa
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                                            Hoạt động
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-6 text-sm text-gray-600">
                                                    {user.deleted_at
                                                        ? new Date(user.deleted_at).toLocaleDateString('vi-VN')
                                                        : '-'}
                                                </td>
                                                <td className="px-6 py-6 text-right">
                                                    {isLocked ? (
                                                        <button
                                                            onClick={() => handleRestore(user.ID_User)}
                                                            disabled={isProcessing}
                                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            {isProcessing ? 'Đang xử lý...' : 'Mở khóa'}
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleLock(user.ID_User)}
                                                            disabled={isProcessing}
                                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            {isProcessing ? 'Đang xử lý...' : 'Khóa'}
                                                        </button>
                                                    )}
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
        </div>
    );
}
