import { useState } from "react";

import {
    Mail,
    MapPin,
    Phone,
    Send,
} from "lucide-react";

import { sendContactMessage } from "../api/contact";

export default function Contact({ profile }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const {
            name,
            value,
        } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setSuccess("");
        setError("");

        try {
            await sendContactMessage(form);

            setSuccess(
                "Your message has been sent successfully."
            );

            setForm({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
        } catch (err) {
            console.error(err);

            setError(
                err?.response?.data?.message ||
                    "Unable to send your message."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="contact"
            className="relative overflow-hidden bg-[#02030a] py-8 sm:py-12"
        >
            <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

            <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-pink-600/10 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-pink-400">
                    Contact
                </p>

                <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl md:text-4xl lg:text-5xl">
                    Let's work together
                </h2>

                <div className="mt-2 sm:mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500" />

                <p className="mt-3 sm:mt-5 max-w-2xl leading-8 text-gray-400">
                    Have a project, opportunity, or question?
                    Send me a message.
                </p>

                <div className="mt-6 sm:mt-12 grid gap-6 lg:grid-cols-3">

                    {/* Information */}
                    <div className="space-y-5">

                        {profile?.email && (
                            <a
                                href={`mailto:${profile.email}`}
                                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition hover:border-cyan-500/40"
                            >
                                <Mail
                                    className="text-cyan-400"
                                    size={22}
                                />

                                <div>
                                    <p className="text-sm font-semibold text-white">
                                        Email
                                    </p>

                                    <p className="mt-1 break-all text-sm text-gray-500">
                                        {profile.email}
                                    </p>
                                </div>
                            </a>
                        )}

                        {profile?.phone && (
                            <a
                                href={`tel:${profile.phone}`}
                                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition hover:border-purple-500/40"
                            >
                                <Phone
                                    className="text-purple-400"
                                    size={22}
                                />

                                <div>
                                    <p className="text-sm font-semibold text-white">
                                        Phone
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {profile.phone}
                                    </p>
                                </div>
                            </a>
                        )}

                        {profile?.location && (
                            <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                                <MapPin
                                    className="text-pink-400"
                                    size={22}
                                />

                                <div>
                                    <p className="text-sm font-semibold text-white">
                                        Location
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {profile.location}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl sm:p-6 lg:col-span-2"
                    >

                        {success && (
                            <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
                                {success}
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                                {error}
                            </div>
                        )}

                        <div className="grid gap-6 sm:grid-cols-2">

                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-gray-400"
                                >
                                    Name
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-cyan-400"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-400"
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-purple-400"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label
                                htmlFor="subject"
                                className="mb-2 block text-sm font-medium text-gray-400"
                            >
                                Subject
                            </label>

                            <input
                                id="subject"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-pink-400"
                                placeholder="How can I help?"
                            />
                        </div>

                        <div className="mt-6">
                            <label
                                htmlFor="message"
                                className="mb-2 block text-sm font-medium text-gray-400"
                            >
                                Message
                            </label>

                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={form.message}
                                onChange={handleChange}
                                required
                                className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-purple-400"
                                placeholder="Write your message..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-purple-600/20 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Send size={18} />

                            {loading
                                ? "Sending..."
                                : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}