import { useEffect, useState } from "react";

import {
    FolderKanban,
    Wrench,
    Briefcase,
    Newspaper,
    GraduationCap,
    Award,
    Layers,
    Mail,
} from "lucide-react";

import api from "../api/api";

const resources = [
    {
        title: "Projects",
        endpoint: "/projects",
        icon: FolderKanban,
        gradient:
            "from-blue-500 to-cyan-400",
    },
    {
        title: "Skills",
        endpoint: "/skills",
        icon: Wrench,
        gradient:
            "from-purple-500 to-violet-400",
    },
    {
        title: "Services",
        endpoint: "/services",
        icon: Layers,
        gradient:
            "from-pink-500 to-rose-400",
    },
    {
        title: "Experience",
        endpoint: "/experiences",
        icon: Briefcase,
        gradient:
            "from-blue-500 to-purple-500",
    },
    {
        title: "Education",
        endpoint: "/educations",
        icon: GraduationCap,
        gradient:
            "from-purple-500 to-pink-500",
    },
    {
        title: "Messages",
        endpoint:
            "/admin/contact-messages",
        icon: Mail,
        gradient:
            "from-violet-500 to-pink-500",
    },
];

export default function AdminDashboard() {

    const [counts, setCounts] =
        useState({});

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const loadCounts =
            async () => {

                setLoading(true);

                const results =
                    await Promise.all(
                        resources.map(
                            async (resource) => {

                                try {

                                    const response =
                                        await api.get(
                                            resource.endpoint
                                        );

                                    let data =
                                        response.data;

                                    if (
                                        Array.isArray(
                                            data
                                        )
                                    ) {
                                        return {
                                            title:
                                                resource.title,
                                            count:
                                                data.length,
                                        };
                                    }

                                    if (
                                        Array.isArray(
                                            data?.data
                                        )
                                    ) {
                                        return {
                                            title:
                                                resource.title,
                                            count:
                                                data.data
                                                    .length,
                                        };
                                    }

                                    return {
                                        title:
                                            resource.title,
                                        count:
                                            0,
                                    };

                                } catch (
                                error
                                ) {

                                    console.error(
                                        resource.title,
                                        error
                                    );

                                    return {
                                        title:
                                            resource.title,
                                        count:
                                            0,
                                    };
                                }
                            }
                        )
                    );

                const result =
                    {};

                results.forEach(
                    (item) => {
                        result[
                            item.title
                        ] = item.count;
                    }
                );

                setCounts(result);
                setLoading(false);
            };

        loadCounts();

    }, []);

    return (
        <div className="space-y-6">

            {/* Header */}
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
                    Dashboard
                </h1>

                <p className="mt-1 text-slate-400">
                    Manage your portfolio content.
                </p>

            </div>

            {/* Statistics */}
            <div
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-4
                    gap-5
                "
            >

                {resources.map(
                    (card) => {

                        const Icon =
                            card.icon;

                        return (
                            <div
                                key={
                                    card.title
                                }
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-white/5
                                    backdrop-blur-xl
                                    p-5
                                    shadow-xl
                                    transition
                                    hover:-translate-y-1
                                    hover:border-white/20
                                "
                            >

                                <div
                                    className={`
                                        absolute
                                        -right-10
                                        -top-10
                                        w-28
                                        h-28
                                        rounded-full
                                        bg-gradient-to-br
                                        ${card.gradient}
                                        opacity-20
                                        blur-2xl
                                    `}
                                />

                                <div className="relative flex items-center justify-between">

                                    <div>

                                        <p className="text-sm font-medium text-slate-400">
                                            {
                                                card.title
                                            }
                                        </p>

                                        <p className="mt-2 text-3xl font-bold text-white">
                                            {loading
                                                ? "..."
                                                : counts[
                                                card
                                                    .title
                                                ] ??
                                                0}
                                        </p>

                                    </div>

                                    <div
                                        className={`
                                            w-12 h-12
                                            rounded-xl
                                            bg-gradient-to-br
                                            ${card.gradient}
                                            text-white
                                            flex items-center
                                            justify-center
                                            shadow-lg
                                        `}
                                    >
                                        <Icon
                                            size={
                                                23
                                            }
                                        />
                                    </div>

                                </div>

                            </div>
                        );
                    }
                )}

            </div>

            {/* Welcome */}
            <div
                className="
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    p-6
                    shadow-xl
                "
            >

                <div
                    className="
                        absolute
                        -right-20
                        -bottom-20
                        w-64
                        h-64
                        rounded-full
                        bg-purple-600/20
                        blur-3xl
                    "
                />

                <div className="relative">

                    <h2 className="text-lg font-semibold text-white">
                        Welcome to Portfolio Admin
                    </h2>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                        Use the sidebar to manage your
                        profile, projects, skills,
                        services, experience,
                        education, certificates,
                        articles, social links and
                        contact messages.
                    </p>

                </div>

            </div>

        </div>
    );
}