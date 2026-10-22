import { useEffect, useState } from "react";

import {
    User,
    Mail,
    Phone,
    MapPin,
    Upload,
    FileText,
    Image as ImageIcon,
    ExternalLink,
    Pencil,
    Plus,
    Save,
    X,
} from "lucide-react";
import Swal from "sweetalert2";

import api from "../../api/api";

const EMPTY_FORM = {
    name: "",
    title: "",
    short_bio: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    availability: "",
};

const swalTheme = {
    background: "#080b16",
    color: "#ffffff",
};

const showSuccess = (
    title,
    text
) => {
    return Swal.fire({
        ...swalTheme,
        icon: "success",
        title,
        text,
        confirmButtonText: "OK",
        confirmButtonColor:
            "#9333ea",
    });
};

const showError = (
    title,
    text
) => {
    return Swal.fire({
        ...swalTheme,
        icon: "error",
        title,
        text,
        confirmButtonText: "OK",
        confirmButtonColor:
            "#dc2626",
    });
};

export default function ProfileAdmin() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [profile, setProfile] = useState(null);

    const [formOpen, setFormOpen] =
        useState(false);

    const [form, setForm] =
        useState(EMPTY_FORM);

    const [profileImage, setProfileImage] =
        useState(null);

    const [resumeFile, setResumeFile] =
        useState(null);

    const [imagePreview, setImagePreview] =
        useState(null);

    // ==========================================
    // LOAD PROFILE
    // ==========================================

    const loadProfile = async () => {
        setLoading(true);

        try {
            const response =
                await api.get("/profile");

            const data =
                response.data?.data ?? null;

            /*
             * No profile is NOT an error.
             */
            if (!data) {
                setProfile(null);
                setForm(EMPTY_FORM);
                setFormOpen(false);

                setProfileImage(null);
                setResumeFile(null);
                setImagePreview(null);

                return;
            }

            setProfile(data);

            setForm({
                name: data.name || "",
                title: data.title || "",
                short_bio:
                    data.short_bio || "",
                bio: data.bio || "",
                email: data.email || "",
                phone: data.phone || "",
                location:
                    data.location || "",
                availability:
                    data.availability || "",
            });

            setImagePreview(
                data.profile_image || null
            );

            setProfileImage(null);
            setResumeFile(null);
        } catch (error) {
            console.error(
                "Failed to load profile:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    // ==========================================
    // OPEN CREATE
    // ==========================================

    const handleCreateClick = () => {
        setForm(EMPTY_FORM);

        setProfileImage(null);
        setResumeFile(null);
        setImagePreview(null);

        setFormOpen(true);
    };

    // ==========================================
    // OPEN EDIT
    // ==========================================

    const handleEditClick = () => {
        if (!profile) {
            return;
        }

        setForm({
            name: profile.name || "",
            title: profile.title || "",
            short_bio:
                profile.short_bio || "",
            bio: profile.bio || "",
            email: profile.email || "",
            phone: profile.phone || "",
            location:
                profile.location || "",
            availability:
                profile.availability || "",
        });

        setProfileImage(null);
        setResumeFile(null);

        setImagePreview(
            profile.profile_image || null
        );

        setFormOpen(true);
    };

    // ==========================================
    // CANCEL FORM
    // ==========================================

    const handleCancel = () => {
        if (saving) {
            return;
        }

        setFormOpen(false);

        setProfileImage(null);
        setResumeFile(null);

        setImagePreview(
            profile?.profile_image || null
        );
    };

    // ==========================================
    // TEXT INPUT
    // ==========================================

    const handleChange = (e) => {
        const {
            name,
            value,
        } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    // ==========================================
    // PROFILE IMAGE
    // ==========================================

    const handleImageChange = async (e) => {
        const file =
            e.target.files?.[0];

        if (!file) {
            return;
        }

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];

        if (
            !allowedTypes.includes(
                file.type
            )
        ) {
            await showError(
                "Invalid Image",
                "Please select JPG, JPEG, PNG or WEBP."
            );

            e.target.value = "";
            return;
        }

        if (
            file.size >
            5 * 1024 * 1024
        ) {
            await showError(
                "Image Too Large",
                "Profile image must be smaller than 5MB."
            );

            e.target.value = "";
            return;
        }

        setProfileImage(file);

        const preview =
            URL.createObjectURL(file);

        setImagePreview(preview);
    };

    // ==========================================
    // REMOVE NEW IMAGE
    // ==========================================

    const removeSelectedImage =
        async () => {
            const result =
                await Swal.fire({
                    ...swalTheme,
                    icon: "warning",
                    title: "Remove image?",
                    text: "The newly selected image will be removed from the form.",
                    showCancelButton: true,
                    confirmButtonText:
                        "Yes, Remove",
                    cancelButtonText:
                        "Cancel",
                    confirmButtonColor:
                        "#dc2626",
                    cancelButtonColor:
                        "#475569",
                    reverseButtons: true,
                });

            if (
                !result.isConfirmed
            ) {
                return;
            }

            setProfileImage(null);

            setImagePreview(
                profile?.profile_image ||
                null
            );

            const input =
                document.getElementById(
                    "profile_image"
                );

            if (input) {
                input.value = "";
            }
        };

    // ==========================================
    // RESUME
    // ==========================================

    const handleResumeChange = async (e) => {
        const file =
            e.target.files?.[0];

        if (!file) {
            return;
        }

        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (
            !allowedTypes.includes(
                file.type
            )
        ) {
            await showError(
                "Invalid CV / Resume",
                "Please select PDF"
            );

            e.target.value = "";
            return;
        }

        if (
            file.size >
            10 * 1024 * 1024
        ) {
            await showError(
                "CV / Resume Too Large",
                "CV/Resume must be smaller than 10MB."
            );

            e.target.value = "";
            return;
        }

        setResumeFile(file);
    };

    // ==========================================
    // SAVE
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);

        try {
            const formData =
                new FormData();

            formData.append(
                "name",
                form.name
            );

            formData.append(
                "title",
                form.title
            );

            formData.append(
                "short_bio",
                form.short_bio
            );

            formData.append(
                "bio",
                form.bio
            );

            formData.append(
                "email",
                form.email
            );

            formData.append(
                "phone",
                form.phone
            );

            formData.append(
                "location",
                form.location
            );

            formData.append(
                "availability",
                form.availability
            );

            if (profileImage) {
                formData.append(
                    "profile_image",
                    profileImage
                );
            }

            if (resumeFile) {
                formData.append(
                    "resume",
                    resumeFile
                );
            }

            // ==================================
            // CREATE
            // ==================================

            if (!profile) {
                await api.post(
                    "/admin/profile",
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );

                await showSuccess(
                    "Profile Created",
                    "Your portfolio profile was created successfully."
                );
            }

            // ==================================
            // UPDATE
            // ==================================

            else {
                formData.append(
                    "_method",
                    "PUT"
                );

                await api.post(
                    `/admin/profile/${profile.id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );

                await showSuccess(
                    "Profile Updated",
                    "Your portfolio profile was updated successfully."
                );
            }

            setFormOpen(false);

            setProfileImage(null);
            setResumeFile(null);

            await loadProfile();
        } catch (error) {
            console.error(
                "Failed to save profile:",
                error
            );

            console.error(
                "Response:",
                error.response?.data
            );

            const errors =
                error.response?.data?.errors;

            if (errors) {
                const messages =
                    Object.entries(errors)
                        .map(
                            ([field, fieldErrors]) =>
                                `<div style="text-align:left; margin-bottom:8px;">
                            <strong>${escapeHtml(field)}</strong>
                            <div style="margin-top:3px;color:#cbd5e1;">
                                ${fieldErrors
                                    .map(
                                        (message) =>
                                            escapeHtml(
                                                message
                                            )
                                    )
                                    .join(
                                        "<br>"
                                    )}
                            </div>
                        </div>`
                        )
                        .join("");

                await Swal.fire({
                    ...swalTheme,
                    icon: "error",
                    title: "Validation Error",
                    html: messages,
                    confirmButtonText: "OK",
                    confirmButtonColor:
                        "#9333ea",
                });
            } else {
                await showError(
                    "Save Failed",
                    error.response?.data
                        ?.message ||
                    "Failed to save profile."
                );
            }
        } finally {
            setSaving(false);
        }
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center text-slate-400">
                Loading profile...
            </div>
        );
    }

    // ==========================================
    // CREATE FORM
    // ==========================================

    if (!profile && formOpen) {
        return (
            <ProfileForm
                form={form}
                setForm={setForm}
                profileImage={profileImage}
                imagePreview={imagePreview}
                resumeFile={resumeFile}
                profile={null}
                saving={saving}
                onChange={handleChange}
                onImageChange={
                    handleImageChange
                }
                onResumeChange={
                    handleResumeChange
                }
                onRemoveImage={
                    removeSelectedImage
                }
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        );
    }

    // ==========================================
    // EDIT FORM
    // ==========================================

    if (profile && formOpen) {
        return (
            <ProfileForm
                form={form}
                setForm={setForm}
                profileImage={profileImage}
                imagePreview={imagePreview}
                resumeFile={resumeFile}
                profile={profile}
                saving={saving}
                onChange={handleChange}
                onImageChange={
                    handleImageChange
                }
                onResumeChange={
                    handleResumeChange
                }
                onRemoveImage={
                    removeSelectedImage
                }
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        );
    }

    // ==========================================
    // EMPTY STATE
    // ==========================================

    if (!profile) {
        return (
            <div className="space-y-6">

                <PageHeader
                    title="Profile"
                    description="Manage your portfolio profile."
                />

                <div
                    className="
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/5
                        p-8
                        text-center
                        backdrop-blur-xl
                        sm:p-12
                    "
                >

                    <div
                        className="
                            mx-auto
                            flex
                            h-20
                            w-20
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-br
                            from-blue-500/20
                            via-purple-500/20
                            to-pink-500/20
                            text-purple-400
                        "
                    >
                        <User size={36} />
                    </div>

                    <h2 className="mt-6 text-xl font-bold text-white">
                        No profile yet
                    </h2>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                        You have not created your
                        portfolio profile yet. Click
                        the button below to create it.
                    </p>

                    <button
                        type="button"
                        onClick={
                            handleCreateClick
                        }
                        className="
                            mt-6
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-gradient-to-r
                            from-blue-600
                            via-purple-600
                            to-pink-600
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            shadow-lg
                            shadow-purple-500/20
                            transition
                            hover:scale-[1.01]
                        "
                    >
                        <Plus size={18} />

                        Create Profile
                    </button>

                </div>

            </div>
        );
    }

    // ==========================================
    // DISPLAY PROFILE DATA
    // ==========================================

    return (
        <div className="space-y-6">

            <PageHeader
                title="Profile"
                description="View and manage your portfolio profile."
            />

            {/* ACTION */}
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={
                        handleEditClick
                    }
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-gradient-to-r
                        from-blue-600
                        via-purple-600
                        to-pink-600
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        shadow-lg
                        shadow-purple-500/20
                        transition
                        hover:scale-[1.01]
                    "
                >
                    <Pencil size={17} />

                    Edit Profile
                </button>
            </div>

            {/* PROFILE CARD */}
            <div
                className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    shadow-xl
                    backdrop-blur-xl
                "
            >

                {/* TOP */}
                <div
                    className="
                        relative
                        border-b
                        border-white/10
                        bg-gradient-to-r
                        from-blue-500/10
                        via-purple-500/10
                        to-pink-500/10
                        p-6
                        sm:p-8
                    "
                >

                    <div
                        className="
                            flex
                            flex-col
                            gap-6
                            sm:flex-row
                            sm:items-center
                        "
                    >

                        {/* IMAGE */}
                        <div
                            className="
                                h-28
                                w-28
                                shrink-0
                                overflow-hidden
                                rounded-2xl
                                border
                                border-white/10
                                bg-black/40
                                shadow-xl
                                sm:h-36
                                sm:w-36
                            "
                        >
                            {profile.profile_image ? (
                                <img
                                    src={
                                        profile.profile_image
                                    }
                                    alt={
                                        profile.name ||
                                        "Profile"
                                    }
                                    className="
                                        h-full
                                        w-full
                                        object-cover
                                    "
                                />
                            ) : (
                                <div
                                    className="
                                        flex
                                        h-full
                                        w-full
                                        items-center
                                        justify-center
                                        bg-gradient-to-br
                                        from-blue-500/20
                                        via-purple-500/20
                                        to-pink-500/20
                                        text-purple-400
                                    "
                                >
                                    <User size={40} />
                                </div>
                            )}
                        </div>

                        {/* NAME */}
                        <div>

                            <h2 className="text-2xl font-bold text-white sm:text-3xl">
                                {profile.name}
                            </h2>

                            {profile.title && (
                                <p
                                    className="
                                        mt-2
                                        text-lg
                                        font-medium
                                        text-purple-400
                                    "
                                >
                                    {
                                        profile.title
                                    }
                                </p>
                            )}

                            {profile.availability && (
                                <span
                                    className="
                                        mt-4
                                        inline-flex
                                        rounded-full
                                        border
                                        border-emerald-500/20
                                        bg-emerald-500/10
                                        px-3
                                        py-1
                                        text-xs
                                        font-medium
                                        text-emerald-400
                                    "
                                >
                                    {
                                        profile.availability
                                    }
                                </span>
                            )}

                        </div>

                    </div>
                </div>

                {/* INFORMATION */}
                <div className="p-6 sm:p-8">

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-6
                            sm:grid-cols-2
                        "
                    >

                        <InfoItem
                            icon={Mail}
                            label="Email"
                            value={
                                profile.email
                            }
                        />

                        <InfoItem
                            icon={Phone}
                            label="Phone"
                            value={
                                profile.phone
                            }
                        />

                        <InfoItem
                            icon={MapPin}
                            label="Location"
                            value={
                                profile.location
                            }
                        />

                        <InfoItem
                            icon={User}
                            label="Availability"
                            value={
                                profile.availability
                            }
                        />

                    </div>

                    {/* SHORT BIO */}
                    {profile.short_bio && (
                        <InfoSection
                            title="Short Bio"
                            value={
                                profile.short_bio
                            }
                        />
                    )}

                    {/* BIO */}
                    {profile.bio && (
                        <InfoSection
                            title="Biography"
                            value={
                                profile.bio
                            }
                        />
                    )}

                    {/* FILES */}
                    <div
                        className="
                            mt-8
                            border-t
                            border-white/10
                            pt-8
                        "
                    >

                        <h3 className="text-lg font-semibold text-white">
                            Files
                        </h3>

                        <div
                            className="
                                mt-4
                                grid
                                grid-cols-1
                                gap-4
                                sm:grid-cols-2
                            "
                        >

                            {/* IMAGE */}
                            <FileCard
                                icon={ImageIcon}
                                title="Profile Image"
                                value={
                                    profile.profile_image
                                }
                                type="image"
                            />

                            {/* RESUME */}
                            <FileCard
                                icon={FileText}
                                title="CV / Resume"
                                value={
                                    profile.resume
                                }
                                type="file"
                            />

                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
}


// ==========================================
// PAGE HEADER
// ==========================================

function PageHeader({
    title,
    description,
}) {
    return (
        <div>

            <h1
                className="text-2xl
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
                {title}
            </h1>

            <p className="mt-1 text-sm text-slate-400">
                {description}
            </p>

        </div>
    );
}


// ==========================================
// INFO ITEM
// ==========================================

function InfoItem({
    icon: Icon,
    label,
    value,
}) {
    return (
        <div
            className="
                rounded-xl
                border
                border-white/10
                bg-black/20
                p-4
            "
        >
            <div className="flex items-start gap-3">

                <div
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-purple-500/10
                        text-purple-400
                    "
                >
                    <Icon size={18} />
                </div>

                <div className="min-w-0">

                    <p className="text-xs text-slate-500">
                        {label}
                    </p>

                    <p className="mt-1 break-words text-sm font-medium text-slate-200">
                        {value || "Not provided"}
                    </p>

                </div>

            </div>
        </div>
    );
}


// ==========================================
// INFO SECTION
// ==========================================

function InfoSection({
    title,
    value,
}) {
    return (
        <div className="mt-8 border-t border-white/10 pt-8">

            <h3 className="text-lg font-semibold text-white">
                {title}
            </h3>

            <div
                className="
                    mt-4
                    rounded-xl
                    border
                    border-white/10
                    bg-black/20
                    p-5
                "
            >
                <p className="whitespace-pre-line text-sm leading-7 text-slate-300">
                    {value}
                </p>
            </div>

        </div>
    );
}


// ==========================================
// FILE CARD
// ==========================================

function FileCard({
    icon: Icon,
    title,
    value,
    type,
}) {
    return (
        <div
            className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-white/10
                bg-black/20
                p-4
            "
        >

            <div
                className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-pink-500/10
                    text-pink-400
                "
            >
                <Icon size={20} />
            </div>

            <div className="min-w-0 flex-1">

                <p className="text-xs text-slate-500">
                    {title}
                </p>

                {value ? (
                    <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            mt-1
                            flex
                            items-center
                            gap-1
                            truncate
                            text-sm
                            font-medium
                            text-purple-400
                            hover:text-purple-300
                        "
                    >
                        {type === "image"
                            ? "View image"
                            : "View CV / Resume"}

                        <ExternalLink size={14} />
                    </a>
                ) : (
                    <p className="mt-1 text-sm text-slate-600">
                        Not uploaded
                    </p>
                )}

            </div>

        </div>
    );
}


// ==========================================
// FORM
// ==========================================

function ProfileForm({
    form,
    profileImage,
    imagePreview,
    resumeFile,
    profile,
    saving,
    onChange,
    onImageChange,
    onResumeChange,
    onRemoveImage,
    onSubmit,
    onCancel,
}) {
    const isCreate = !profile;

    return (
        <div className="space-y-6">

            <PageHeader
                title={
                    isCreate
                        ? "Create Profile"
                        : "Edit Profile"
                }
                description={
                    isCreate
                        ? "Create your portfolio profile."
                        : "Update your portfolio profile."
                }
            />

            <form
                onSubmit={onSubmit}
                className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    p-5
                    shadow-xl
                    backdrop-blur-xl
                    sm:p-7
                "
            >

                {/* =================================
                    PROFILE IMAGE
                ================================== */}

                <div className="border-b border-white/10 pb-8">

                    <h2 className="text-lg font-semibold text-white">
                        Profile Image
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        JPG, JPEG, PNG or WEBP • Maximum 5MB
                    </p>

                    <div
                        className="
                            mt-5
                            flex
                            flex-col
                            gap-6
                            sm:flex-row
                            sm:items-start
                        "
                    >

                        {/* Preview */}

                        <div className="relative shrink-0">

                            <div
                                className="
                                    h-32
                                    w-32
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-black/40
                                    sm:h-40
                                    sm:w-40
                                "
                            >
                                {imagePreview ? (
                                    <img
                                        src={
                                            imagePreview
                                        }
                                        alt="Profile preview"
                                        className="
                                            h-full
                                            w-full
                                            object-cover
                                        "
                                    />
                                ) : (
                                    <div
                                        className="
                                            flex
                                            h-full
                                            w-full
                                            items-center
                                            justify-center
                                            text-slate-600
                                        "
                                    >
                                        <ImageIcon
                                            size={
                                                40
                                            }
                                        />
                                    </div>
                                )}
                            </div>

                            {profileImage && (
                                <button
                                    type="button"
                                    onClick={
                                        onRemoveImage
                                    }
                                    className="
                                        absolute
                                        -right-2
                                        -top-2
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-red-500
                                        text-white
                                    "
                                >
                                    <X size={16} />
                                </button>
                            )}

                        </div>

                        {/* Upload */}

                        <div className="w-full">

                            <label
                                htmlFor="profile_image"
                                className="
                                    flex
                                    min-h-32
                                    cursor-pointer
                                    flex-col
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-dashed
                                    border-white/20
                                    bg-black/20
                                    p-5
                                    text-center
                                    transition
                                    hover:border-purple-500/50
                                    hover:bg-white/5
                                "
                            >
                                <Upload
                                    size={28}
                                    className="mb-3 text-purple-400"
                                />

                                <span className="text-sm font-medium text-slate-300">
                                    Click to upload image
                                </span>

                                <span className="mt-1 text-xs text-slate-500">
                                    {profileImage
                                        ? profileImage.name
                                        : "JPG, JPEG, PNG or WEBP • Max 5MB"}
                                </span>

                            </label>

                            <input
                                id="profile_image"
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                onChange={
                                    onImageChange
                                }
                                className="hidden"
                            />

                        </div>

                    </div>

                </div>

                {/* =================================
                    BASIC INFORMATION
                ================================== */}

                <div className="py-8">

                    <h2 className="mb-5 text-lg font-semibold text-white">
                        Basic Information
                    </h2>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        <Field
                            label="Name"
                            name="name"
                            value={
                                form.name
                            }
                            onChange={
                                onChange
                            }
                            icon={User}
                            required
                        />

                        <Field
                            label="Professional Title"
                            name="title"
                            value={
                                form.title
                            }
                            onChange={
                                onChange
                            }
                        />

                        <Field
                            label="Email"
                            name="email"
                            value={
                                form.email
                            }
                            onChange={
                                onChange
                            }
                            icon={Mail}
                            type="email"
                        />

                        <Field
                            label="Phone"
                            name="phone"
                            value={
                                form.phone
                            }
                            onChange={
                                onChange
                            }
                            icon={Phone}
                        />

                        <Field
                            label="Location"
                            name="location"
                            value={
                                form.location
                            }
                            onChange={
                                onChange
                            }
                            icon={MapPin}
                        />

                        <Field
                            label="Availability"
                            name="availability"
                            value={
                                form.availability
                            }
                            onChange={
                                onChange
                            }
                        />

                    </div>

                </div>

                {/* =================================
                    SHORT BIO
                ================================== */}

                <TextAreaField
                    label="Short Bio"
                    name="short_bio"
                    value={
                        form.short_bio
                    }
                    onChange={
                        onChange
                    }
                    rows={4}
                />

                {/* =================================
                    BIO
                ================================== */}

                <TextAreaField
                    label="Biography"
                    name="bio"
                    value={form.bio}
                    onChange={
                        onChange
                    }
                    rows={8}
                />

                {/* =================================
                    RESUME
                ================================== */}

                <div className="mt-8 border-t border-white/10 pt-8">

                    <h2 className="text-lg font-semibold text-white">
                        CV / Resume
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        PDF, DOC or DOCX • Maximum 10MB
                    </p>

                    {/* Existing resume */}

                    {profile?.resume && (
                        <div
                            className="
                                mt-5
                                mb-4
                                flex
                                flex-col
                                gap-3
                                rounded-xl
                                border
                                border-white/10
                                bg-black/20
                                p-4
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                            "
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-pink-500/10
                                        text-pink-400
                                    "
                                >
                                    <FileText
                                        size={20}
                                    />
                                </div>

                                <div>

                                    <p className="text-sm font-medium text-white">
                                        Current CV /
                                        Resume
                                    </p>

                                </div>

                            </div>

                            <a
                                href={
                                    profile.resume
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-lg
                                    bg-white/5
                                    px-3
                                    py-2
                                    text-sm
                                    text-purple-400
                                    hover:bg-white/10
                                "
                            >
                                <ExternalLink
                                    size={16}
                                />
                                View Resume
                            </a>

                        </div>
                    )}

                    {/* New resume */}

                    <label
                        htmlFor="resume"
                        className="
                            mt-5
                            flex
                            min-h-36
                            cursor-pointer
                            flex-col
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-dashed
                            border-white/20
                            bg-black/20
                            p-5
                            text-center
                            transition
                            hover:border-pink-500/50
                            hover:bg-white/5
                        "
                    >

                        <FileText
                            size={30}
                            className="mb-3 text-pink-400"
                        />

                        <span className="text-sm font-medium text-slate-300">
                            {resumeFile
                                ? resumeFile.name
                                : "Click to upload CV / Resume"}
                        </span>

                        <span className="mt-1 text-xs text-slate-500">
                            PDF, DOC or DOCX • Max 10MB
                        </span>

                    </label>

                    <input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={
                            onResumeChange
                        }
                        className="hidden"
                    />

                </div>

                {/* =================================
                    ACTIONS
                ================================== */}

                <div
                    className="
                        mt-8
                        flex
                        flex-col-reverse
                        gap-3
                        border-t
                        border-white/10
                        pt-5
                        sm:flex-row
                        sm:justify-end
                    "
                >

                    <button
                        type="button"
                        onClick={
                            onCancel
                        }
                        disabled={saving}
                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-white/10
                            bg-white/5
                            px-5
                            py-3
                            text-sm
                            font-medium
                            text-slate-300
                            hover:bg-white/10
                            disabled:opacity-50
                        "
                    >
                        <X size={17} />
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={saving}
                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-gradient-to-r
                            from-blue-600
                            via-purple-600
                            to-pink-600
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            shadow-lg
                            shadow-purple-500/20
                            hover:scale-[1.01]
                            transition
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >

                        <Save size={17} />

                        {saving
                            ? "Saving..."
                            : isCreate
                                ? "Create Profile"
                                : "Update Profile"}

                    </button>

                </div>

            </form>
        </div>
    );
}


// ==========================================
// INPUT FIELD
// ==========================================

function Field({
    label,
    name,
    value,
    onChange,
    icon: Icon,
    type = "text",
    required = false,
}) {
    return (
        <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">

                {label}

                {required && (
                    <span className="ml-1 text-pink-400">
                        *
                    </span>
                )}

            </label>

            <div className="relative">

                {Icon && (
                    <Icon
                        size={17}
                        className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-purple-400
                        "
                    />
                )}

                <input
                    type={type}
                    name={name}
                    value={
                        value || ""
                    }
                    onChange={
                        onChange
                    }
                    required={
                        required
                    }
                    className={`
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-black/30
                        px-4
                        py-3
                        text-white
                        outline-none
                        transition
                        placeholder:text-slate-600
                        focus:border-purple-500
                        focus:ring-2
                        focus:ring-purple-500/20
                        ${Icon
                            ? "pl-10"
                            : ""
                        }
                    `}
                />

            </div>
        </div>
    );
}


// ==========================================
// TEXTAREA
// ==========================================

function TextAreaField({
    label,
    name,
    value,
    onChange,
    rows,
}) {
    return (
        <div className="mb-8">

            <label className="mb-2 block text-sm font-medium text-slate-300">
                {label}
            </label>

            <textarea
                name={name}
                value={
                    value || ""
                }
                onChange={
                    onChange
                }
                rows={rows}
                className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-black/30
                    px-4
                    py-3
                    text-white
                    outline-none
                    transition
                    placeholder:text-slate-600
                    focus:border-purple-500
                    focus:ring-2
                    focus:ring-purple-500/20
                "
            />

        </div>
    );
}


function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}