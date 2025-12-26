import React from "react";
import Dialog from "../Global/Dialog";
import { Copy } from "lucide-react";
import CopyButton from "../ui/CopyButton";

const UserDetailsCard = ({ user, onClose }) => {
    if (!user) return <div className="p-4">No user selected</div>;

    return (
        <Dialog
            onClose={onClose}
            containerClassName="w-[500] text-wrap px-8 overflow-x-hidden"
        >

            <h2 className="text-2xl font-bold mt-2 mb-4 text-gray-800">
                User Details
            </h2>

            {/* Avatar */}
            <div className="flex items-start mt-8 gap-4 mb-6">
                <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-25 h-30 object-top  object-cover border"
                />
                <div>
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-gray-500">{user.email}</p>
                </div>
            </div>

            {/* Grid Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoItem label="Role" value={user.role} />
                <InfoItem label="Phone" value={user.phone || "—"} />
                <InfoItem label="Address" value={user.address || "—"} />
                <InfoItem label="Auth Provider" value={user.authProvider} />
                <InfoItem label="Google ID" value={user.googleId || "—"} />
                <InfoItem label="Facebook ID" value={user.facebookId || "—"} />
                <InfoItem label="Active" value={user.isActive ? "Yes" : "No"} />
                <InfoItem label="Suspended" value={user.isSuspended ? "Yes" : "No"} />
                <InfoItem
                    label="Suspension Reason"
                    value={user.suspensionReason || "—"}
                />

                <InfoItem
                    label="Deleted At"
                    value={user.deletedAt ? new Date(user.deletedAt).toLocaleString() : "—"}
                />

                <InfoItem
                    label="Created At"
                    value={new Date(user.createdAt).toLocaleString()}
                />

                <InfoItem
                    label="Updated At"
                    value={new Date(user.updatedAt).toLocaleString()}
                />
            </div>
            
        </Dialog>

    );
};

const InfoItem = ({ label, value }) => (
    <div className="p-3 border rounded-lg bg-gray-50">
        <p className="text-sm w-full flex justify-between items-center text-gray-500">{label} <CopyButton text={value} /></p>
        <p className="font-medium text-gray-800">{value}</p>
    </div>
);

export default UserDetailsCard;
