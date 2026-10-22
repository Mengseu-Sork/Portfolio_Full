import { X } from "lucide-react";

export default function Modal({
    open,
    onClose,
    title,
    children,
    size = "lg",
}) {
    if (!open) {
        return null;
    }

    const sizes = {
        sm: "max-w-md",
        md: "max-w-2xl",
        lg: "max-w-4xl",
        xl: "max-w-6xl",
    };

    return (
        <div className="fixed inset-0 z-50">

            {/* Overlay */}
            <div
                className="
                    absolute inset-0
                    bg-black/70
                    backdrop-blur-sm
                "
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="
                    relative
                    min-h-screen
                    flex items-center
                    justify-center
                    p-4
                "
            >

                <div
                    className={`
                        w-full
                        ${sizes[size] || sizes.lg}
                        max-h-[90vh]
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/10
                        bg-slate-950
                        shadow-2xl
                    `}
                >

                    {/* Header */}
                    <div
                        className="
                            flex items-center
                            justify-between
                            px-5 py-4
                            border-b
                            border-white/10
                            bg-gradient-to-r
                            from-blue-950
                            via-purple-950
                            to-pink-950
                        "
                    >

                        <h2 className="text-lg font-semibold text-white">
                            {title}
                        </h2>

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                p-2
                                rounded-lg
                                text-slate-400
                                hover:bg-white/10
                                hover:text-white
                                transition
                            "
                        >
                            <X size={20} />
                        </button>

                    </div>

                    {/* Body */}
                    <div className="max-h-[calc(90vh-70px)] overflow-y-auto p-5">
                        {children}
                    </div>

                </div>

            </div>

        </div>
    );
}