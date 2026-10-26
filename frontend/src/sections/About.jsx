import {
    CheckCircle,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

export default function About({ profile }) {
    return (
        <section
            id="about"
            className="
                relative
                overflow-hidden
                bg-[#03040b]
                py-10
                sm:py-16
                md:py-20
                lg:py-20
            "
        >

            {/* =========================================
                BACKGROUND GLOW
            ========================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-32
                    top-1/3
                    h-64
                    w-64
                    rounded-full
                    bg-blue-600/10
                    blur-[100px]
                    sm:-left-40
                    sm:h-80
                    sm:w-80
                    lg:h-96
                    lg:w-96
                    lg:blur-[120px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-20
                    bottom-0
                    h-64
                    w-64
                    rounded-full
                    bg-pink-600/10
                    blur-[100px]
                    sm:h-80
                    sm:w-80
                    lg:right-0
                    lg:h-96
                    lg:w-96
                    lg:blur-[120px]
                "
            />

            {/* =========================================
                CONTAINER
            ========================================== */}

            <div
                className="
                    relative
                    mx-auto
                    max-w-7xl
                    px-4
                    sm:px-6
                    lg:px-8
                "
            >

                {/* =====================================
                    SECTION HEADER
                ====================================== */}

                <div
                    className="
                        max-w-3xl
                    "
                >

                    <p
                        className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.2em]
                            text-cyan-400
                            sm:text-sm
                            sm:tracking-[0.25em]
                        "
                    >
                        About Me
                    </p>

                    <h2
                        className="
                            mt-2
                            text-2xl
                            font-black
                            leading-tight
                            text-white
                            sm:mt-3
                            sm:text-3xl
                            md:text-4xl
                            lg:text-5xl
                        "
                    >
                        Who I am
                    </h2>

                    <div
                        className="
                            mt-3
                            h-1
                            w-20
                            rounded-full
                            bg-gradient-to-r
                            from-cyan-400
                            via-purple-500
                            to-pink-500
                            sm:mt-4
                            sm:w-24
                        "
                    />

                </div>


                {/* =====================================
                    CONTENT
                ====================================== */}

                <div
                    className="
                        mt-6
                        grid
                        grid-cols-1
                        gap-6
                        sm:mt-8
                        md:gap-8
                        lg:mt-12
                        lg:grid-cols-3
                        lg:gap-10
                    "
                >

                    {/* =================================
                        BIOGRAPHY
                    ================================== */}

                    <div
                        className="
                            min-w-0
                            lg:col-span-2
                        "
                    >

                        <div
                            className="
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/[0.02]
                                p-5
                                backdrop-blur-sm
                                sm:rounded-3xl
                                sm:p-7
                                lg:bg-transparent
                                lg:p-4
                                lg:backdrop-blur-none
                            "
                        >

                            <p
                                className="
                                    whitespace-pre-line
                                    text-sm
                                    sm:text-base
                                    leading-7
                                    text-gray-400
                                    sm:leading-8
                                "
                            >
                                {profile?.bio ||
                                    profile?.short_bio ||
                                    "No biography available."}
                            </p>

                        </div>

                    </div>


                    {/* =================================
                        PERSONAL INFORMATION
                    ================================== */}

                    <div
                        className="
                            min-w-0
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/[0.03]
                            p-5
                            shadow-xl
                            backdrop-blur-xl
                            sm:rounded-3xl
                            sm:p-7
                            lg:p-7
                        "
                    >

                        <h3
                            className="
                                text-base
                                font-bold
                                text-white
                                sm:text-xl
                            "
                        >
                            Personal Information
                        </h3>


                        <div
                            className="
                                mt-6
                                space-y-5
                                sm:mt-7
                                sm:space-y-6
                            "
                        >

                            {/* =================================
                                EMAIL
                            ================================== */}

                            {profile?.email && (
                                <div
                                    className="
                                        flex
                                        min-w-0
                                        gap-3
                                        sm:gap-4
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-cyan-400/10
                                            text-cyan-400
                                            sm:h-10
                                            sm:w-10
                                            sm:rounded-xl
                                        "
                                    >
                                        <Mail
                                            size={18}
                                            className="sm:h-[21px] sm:w-[21px]"
                                        />
                                    </div>

                                    <div
                                        className="
                                            min-w-0
                                            flex-1
                                        "
                                    >

                                        <p
                                            className="
                                                text-[10px]
                                                font-medium
                                                uppercase
                                                tracking-wider
                                                text-gray-600
                                                sm:text-xs
                                            "
                                        >
                                            Email
                                        </p>

                                        <a
                                            href={`mailto:${profile.email}`}
                                            className="
                                                mt-1
                                                block
                                                break-words
                                                text-sm
                                                leading-6
                                                text-gray-300
                                                transition
                                                hover:text-cyan-400
                                                sm:text-[15px]
                                            "
                                        >
                                            {
                                                profile.email
                                            }
                                        </a>

                                    </div>
                                </div>
                            )}


                            {/* =================================
                                PHONE
                            ================================== */}

                            {profile?.phone && (
                                <div
                                    className="
                                        flex
                                        min-w-0
                                        gap-3
                                        sm:gap-4
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-purple-400/10
                                            text-purple-400
                                            sm:h-10
                                            sm:w-10
                                            sm:rounded-xl
                                        "
                                    >
                                        <Phone
                                            size={18}
                                            className="sm:h-[21px] sm:w-[21px]"
                                        />
                                    </div>

                                    <div
                                        className="
                                            min-w-0
                                            flex-1
                                        "
                                    >

                                        <p
                                            className="
                                                text-[10px]
                                                font-medium
                                                uppercase
                                                tracking-wider
                                                text-gray-600
                                                sm:text-xs
                                            "
                                        >
                                            Phone
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                break-words
                                                text-sm
                                                leading-6
                                                text-gray-300
                                                sm:text-[15px]
                                            "
                                        >
                                            {
                                                profile.phone
                                            }
                                        </p>

                                    </div>
                                </div>
                            )}


                            {/* =================================
                                LOCATION
                            ================================== */}

                            {profile?.location && (
                                <div
                                    className="
                                        flex
                                        min-w-0
                                        gap-3
                                        sm:gap-4
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-pink-400/10
                                            text-pink-400
                                            sm:h-10
                                            sm:w-10
                                            sm:rounded-xl
                                        "
                                    >
                                        <MapPin
                                            size={18}
                                            className="sm:h-[21px] sm:w-[21px]"
                                        />
                                    </div>

                                    <div
                                        className="
                                            min-w-0
                                            flex-1
                                        "
                                    >

                                        <p
                                            className="
                                                text-[10px]
                                                font-medium
                                                uppercase
                                                tracking-wider
                                                text-gray-600
                                                sm:text-xs
                                            "
                                        >
                                            Location
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                break-words
                                                text-sm
                                                leading-6
                                                text-gray-300
                                                sm:text-[15px]
                                            "
                                        >
                                            {
                                                profile.location
                                            }
                                        </p>

                                    </div>
                                </div>
                            )}


                            {/* =================================
                                AVAILABILITY
                            ================================== */}

                            {profile?.availability && (
                                <div
                                    className="
                                        flex
                                        min-w-0
                                        gap-3
                                        sm:gap-4
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-cyan-400/10
                                            text-cyan-400
                                            sm:h-10
                                            sm:w-10
                                            sm:rounded-xl
                                        "
                                    >
                                        <CheckCircle
                                            size={18}
                                            className="sm:h-[21px] sm:w-[21px]"
                                        />
                                    </div>

                                    <div
                                        className="
                                            min-w-0
                                            flex-1
                                        "
                                    >

                                        <p
                                            className="
                                                text-[10px]
                                                font-medium
                                                uppercase
                                                tracking-wider
                                                text-gray-600
                                                sm:text-xs
                                            "
                                        >
                                            Availability
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                break-words
                                                text-sm
                                                leading-6
                                                text-gray-300
                                                sm:text-[15px]
                                            "
                                        >
                                            {
                                                profile.availability
                                            }
                                        </p>

                                    </div>
                                </div>
                            )}

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}