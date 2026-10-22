export default function Loading({
    text = "Loading...",
}) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#02030a]">
            <div className="text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-purple-500/20 border-t-cyan-400" />

                <p className="mt-5 text-sm text-gray-400">
                    {text}
                </p>
            </div>
        </div>
    );
}