import { Building2 } from "lucide-react";

export default function Experience({
    experiences = [],
}) {
    return (
        <section
            id="experience"
            className="relative overflow-hidden bg-[#03040b] py-8 sm:py-10 md:py-12"
        >
            <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/10 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="text-left">
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-purple-400">
                        Experience
                    </p>

                    <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl md:text-4xl lg:text-5xl">
                        Professional experience
                    </h2>

                    <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500" />
                </div>

                {experiences.length === 0 ? (
                    <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-gray-500">
                        No experience available.
                    </div>
                ) : (
                    <div className="relative mt-6 sm:mt-14">

                        <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 sm:block" />

                        <div className="space-y-6 sm:space-y-10">

                            {experiences.map((experience) => (
                                <div
                                    key={experience.id}
                                    className="relative sm:pl-16"
                                >

                                    <div className="absolute left-0 top-0 hidden h-10 w-10 items-center justify-center rounded-full border-4 border-[#03040b] bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/30 sm:flex">
                                        <Building2 size={17} />
                                    </div>

                                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition hover:border-purple-500/40">

                                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                                            <div>
                                                <h3 className="text-lg sm:text-xl font-bold text-white">
                                                    {
                                                        experience.position
                                                    }
                                                </h3>

                                                <p className="mt-1 text-base sm:text-xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold text-transparent">
                                                    {
                                                        experience.company
                                                    }
                                                </p>

                                                {experience.location && (
                                                    <p className="mt-1 text-xs text-gray-500 leading-6">
                                                        {
                                                            experience.location
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <p
                                                className="
                                                    mt-1
                                                    text-xs
                                                    font-medium
                                                    text-gray-500
                                                    sm:text-sm
                                                "
                                            >
                                                {formatDate(experience.start_date)}

                                                {" - "}

                                                {experience.is_current
                                                    ? "Present"
                                                    : formatDate(
                                                        experience.end_date
                                                    )}
                                            </p>
                                        </div>

                                        {experience.description && (
                                            <p className="mt-3 sm:mt-5 whitespace-pre-line text-sm sm:text-base leading-7 text-gray-400">
                                                {
                                                    experience.description
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

function formatDate(date) {
    if (!date) {
        return "";
    }

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
        return date;
    }

    return parsed.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
}