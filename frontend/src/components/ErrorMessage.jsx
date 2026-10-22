export default function ErrorMessage({
    message = "Something went wrong.",
}) {
    return (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center backdrop-blur">
            <p className="font-medium text-red-300">
                {message}
            </p>
        </div>
    );
}