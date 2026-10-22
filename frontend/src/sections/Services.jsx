import { BriefcaseBusiness } from "lucide-react";

export default function Services({
    services = [],
}) {
    return (
        <section
            id="services"
            className="relative overflow-hidden bg-[#03040b] py-8 sm:py-10 md:py-12"
        >
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-pink-600/10 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-pink-400">
                    Services
                </p>

                <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl md:text-4xl lg:text-5xl">
                    What I can do
                </h2>

                <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500" />

                {services.length === 0 ? (
                    <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-gray-500">
                        No services available.
                    </div>
                ) : (
                    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {services.map(
                            (service) => (
                                <div
                                    key={
                                        service.id
                                    }
                                    className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-pink-500/40 hover:shadow-2xl hover:shadow-purple-900/20"
                                >
                                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 text-pink-400">
                                        {renderIcon(
                                            service.icon
                                        )}
                                    </div>

                                    <h3 className="mt-7 text-lg sm:text-xl font-bold text-white">
                                        {
                                            service.title
                                        }
                                    </h3>

                                    {service.short_description && (
                                        <p className="mt-4 leading-7 text-sm sm:text-base text-gray-300">
                                            {
                                                service.short_description
                                            }
                                        </p>
                                    )}

                                    {service.description && (
                                        <p className="mt-4 whitespace-pre-line text-sm leading-6 text-gray-400">
                                            {
                                                service.description
                                            }
                                        </p>
                                    )}

                                    <div className="mt-6 h-px w-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full" />
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

function renderIcon(icon) {
    if (!icon) {
        return (
            <BriefcaseBusiness
                size={25}
            />
        );
    }

    if (
        typeof icon === "string" &&
        (
            icon.startsWith("http://") ||
            icon.startsWith("https://") ||
            icon.startsWith("/storage/")
        )
    ) {
        return (
            <img
                src={icon}
                alt="Service icon"
                className="h-8 w-8 object-contain"
            />
        );
    }

    return (
        <span className="text-2xl">
            {icon}
        </span>
    );
}