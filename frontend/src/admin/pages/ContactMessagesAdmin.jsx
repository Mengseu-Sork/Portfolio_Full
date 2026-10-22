import { useEffect, useState } from "react";
import {
    Trash2,
    Eye,
    RefreshCw,
    Mail,
} from "lucide-react";

import api from "../../api/api";
import Modal from "../components/Modal";

export default function ContactMessagesAdmin() {

    const [messages, setMessages] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [selected, setSelected] =
        useState(null);

    const loadMessages = async () => {

        setLoading(true);

        try {

            const response =
                await api.get(
                    "/admin/contact-messages"
                );

            let data =
                response.data?.data ??
                response.data;

            if (
                data?.data &&
                Array.isArray(
                    data.data
                )
            ) {
                data = data.data;
            }

            setMessages(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Failed to load messages:",
                error
            );

            setMessages([]);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        loadMessages();
    }, []);

    const handleView = async (
        message
    ) => {

        try {

            const response =
                await api.get(
                    `/admin/contact-messages/${message.id}`
                );

            setSelected(
                response.data?.data ??
                response.data
            );

        } catch (error) {

            console.error(
                error
            );

            setSelected(message);
        }
    };

    const handleDelete = async (
        message
    ) => {

        if (
            !window.confirm(
                "Are you sure you want to delete this message?"
            )
        ) {
            return;
        }

        try {

            await api.delete(
                `/admin/contact-messages/${message.id}`
            );

            await loadMessages();

        } catch (error) {

            console.error(
                error
            );

            alert(
                error.response?.data
                    ?.message ||
                "Failed to delete message."
            );
        }
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div
                className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-4
                "
            >

                <div>

                    <h1
                        className="
                            text-2xl
                            sm:text-3xl
                            font-bold
                            bg-gradient-to-r
                            from-blue-400
                            via-purple-400
                            to-pink-400
                            bg-clip-text
                            text-transparent
                        "
                    >
                        Contact Messages
                    </h1>

                    <p className="mt-1 text-slate-400">
                        Messages submitted through your portfolio.
                    </p>

                </div>

                <button
                    onClick={
                        loadMessages
                    }
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        px-4 py-3
                        text-slate-300
                        hover:bg-white/10
                    "
                >
                    <RefreshCw
                        size={17}
                    />
                    Refresh
                </button>

            </div>

            {/* Messages */}
            <div
                className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    shadow-xl
                "
            >

                {loading ? (
                    <div className="p-12 text-center text-slate-400">
                        Loading messages...
                    </div>
                ) : messages.length ===
                    0 ? (
                    <div className="p-12 text-center">

                        <Mail
                            size={40}
                            className="
                                mx-auto
                                text-slate-600
                            "
                        />

                        <p className="mt-3 text-slate-500">
                            No messages found.
                        </p>

                    </div>
                ) : (
                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">

                                    <th className="px-5 py-4 text-left text-sm text-slate-300">
                                        Name
                                    </th>

                                    <th className="px-5 py-4 text-left text-sm text-slate-300">
                                        Email
                                    </th>

                                    <th className="px-5 py-4 text-left text-sm text-slate-300">
                                        Subject
                                    </th>

                                    <th className="px-5 py-4 text-right text-sm text-slate-300">
                                        Actions
                                    </th>

                                </tr>
                            </thead>

                            <tbody>

                                {messages.map(
                                    (
                                        message
                                    ) => (
                                        <tr
                                            key={
                                                message.id
                                            }
                                            className="
                                                border-b
                                                border-white/5
                                                hover:bg-white/5
                                            "
                                        >

                                            <td className="px-5 py-4 text-slate-300">
                                                {
                                                    message.name
                                                }
                                            </td>

                                            <td className="px-5 py-4 text-slate-400">
                                                {
                                                    message.email
                                                }
                                            </td>

                                            <td className="px-5 py-4 text-slate-300">
                                                {
                                                    message.subject ||
                                                    "—"
                                                }
                                            </td>

                                            <td className="px-5 py-4">

                                                <div className="flex justify-end gap-2">

                                                    <button
                                                        onClick={() =>
                                                            handleView(
                                                                message
                                                            )
                                                        }
                                                        className="
                                                            p-2
                                                            rounded-lg
                                                            bg-blue-500/10
                                                            text-blue-400
                                                            hover:bg-blue-500/20
                                                        "
                                                    >
                                                        <Eye
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                message
                                                            )
                                                        }
                                                        className="
                                                            p-2
                                                            rounded-lg
                                                            bg-red-500/10
                                                            text-red-400
                                                            hover:bg-red-500/20
                                                        "
                                                    >
                                                        <Trash2
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    )
                                )}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>

            {/* View Modal */}
            <Modal
                open={
                    Boolean(selected)
                }
                onClose={() =>
                    setSelected(null)
                }
                title="Message Details"
                size="md"
            >

                {selected && (
                    <div className="space-y-5">

                        <Info
                            label="Name"
                            value={
                                selected.name
                            }
                        />

                        <Info
                            label="Email"
                            value={
                                selected.email
                            }
                        />

                        <Info
                            label="Subject"
                            value={
                                selected.subject ||
                                "—"
                            }
                        />

                        <div>

                            <p className="text-xs text-slate-500 mb-2">
                                Message
                            </p>

                            <div className="rounded-xl bg-black/30 border border-white/10 p-4 text-sm leading-6 text-slate-300 whitespace-pre-wrap">
                                {
                                    selected.message
                                }
                            </div>

                        </div>

                    </div>
                )}

            </Modal>

        </div>
    );
}

function Info({
    label,
    value,
}) {
    return (
        <div>

            <p className="text-xs text-slate-500">
                {label}
            </p>

            <p className="mt-1 text-sm text-slate-300">
                {value || "—"}
            </p>

        </div>
    );
}