import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

import {
    Plus,
    Search,
    RefreshCw,
    Upload,
    FileImage,
    FileText,
    X,
} from "lucide-react";

import DataTable from "./DataTable";
import Modal from "./Modal";


// =====================================================
// SWEETALERT THEME
// =====================================================

const swalBase = {
    background: "#05060d",
    color: "#ffffff",
};

const swalConfirm = {
    ...swalBase,
    confirmButtonColor: "#9333ea",
};

const showSuccess = (title, text) => {
    return Swal.fire({
        ...swalConfirm,
        icon: "success",
        title,
        text,
        confirmButtonText: "OK",
    });
};


const showError = (title, text) => {
    return Swal.fire({
        ...swalBase,
        icon: "error",
        title,
        text,
        confirmButtonText: "OK",
        confirmButtonColor: "#dc2626",
    });
};

const showWarning = (title, text) => {
    return Swal.fire({
        ...swalBase,
        icon: "warning",
        title,
        text,
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#475569",
        reverseButtons: true,
    });
};


// =====================================================
// CRUD PAGE
// =====================================================

export default function CrudPage({
    title,
    description,
    api,
    columns,
    fields,
    transformBeforeSubmit,
    transformResponse,
    emptyMessage = "No records found.",
    pageSize = 6,
}) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [modalOpen, setModalOpen] =
        useState(false);

    const [editingItem, setEditingItem] =
        useState(null);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [form, setForm] = useState({});


    // =================================================
    // EMPTY FORM
    // =================================================

    const emptyForm = useMemo(() => {
        const result = {};

        fields.forEach((field) => {
            result[field.name] =
                field.defaultValue ?? "";
        });

        return result;
    }, [fields]);


    // =================================================
    // LOAD ITEMS
    // =================================================

    const loadItems = async () => {
        setLoading(true);

        try {
            const response =
                await api.list();

            let data =
                response?.data ??
                response;

            // Laravel Resource Collection
            if (
                data?.data &&
                Array.isArray(data.data)
            ) {
                data = data.data;
            }

            // Laravel paginator
            if (
                data?.data?.data &&
                Array.isArray(
                    data.data.data
                )
            ) {
                data = data.data.data;
            }

            if (!Array.isArray(data)) {
                data = [];
            }

            const finalData =
                transformResponse
                    ? transformResponse(data)
                    : data;

            setItems(finalData);
        } catch (error) {
            console.error(
                `Failed to load ${title}:`,
                error
            );

            setItems([]);

            await showError(
                `Failed to Load ${title}`,
                error.response?.data?.message ||
                `Unable to load ${title.toLowerCase()}.`
            );
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadItems();
    }, []);


    // =================================================
    // CREATE
    // =================================================

    const openCreate = () => {
        setEditingItem(null);
        setForm({
            ...emptyForm,
        });
        setModalOpen(true);
    };


    // =================================================
    // EDIT
    // =================================================

    const openEdit = (item) => {
        setEditingItem(item);

        const values = {
            ...emptyForm,
        };

        fields.forEach((field) => {

            // File fields start empty.
            // Existing file is displayed separately.
            if (field.type === "file") {
                values[field.name] = null;
                return;
            }

            values[field.name] =
                item[field.name] ??
                field.defaultValue ??
                "";
        });

        setForm(values);
        setModalOpen(true);
    };


    // =================================================
    // CLOSE MODAL
    // =================================================

    const closeModal = () => {
        if (saving) {
            return;
        }

        setModalOpen(false);
        setEditingItem(null);

        setForm({
            ...emptyForm,
        });
    };


    // =================================================
    // INPUT CHANGE
    // =================================================

    const handleChange = (
        name,
        value
    ) => {
        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };


    // =================================================
    // FILE CHANGE
    // =================================================

    const handleFileChange = (
        field,
        event
    ) => {
        const file =
            event.target.files?.[0] ||
            null;

        if (!file) {
            return;
        }


        // ---------------------------------------------
        // FILE SIZE
        // ---------------------------------------------

        const maxSize =
            (field.maxSizeMb || 10) *
            1024 *
            1024;

        if (file.size > maxSize) {

            showError(
                "File Too Large",
                `${field.label} must be smaller than ${field.maxSizeMb || 10
                }MB.`
            );

            event.target.value = "";

            return;
        }


        // ---------------------------------------------
        // FILE TYPE
        // ---------------------------------------------

        if (
            field.accept &&
            field.accept !== "*/*"
        ) {
            const accepted =
                field.accept
                    .split(",")
                    .map((item) =>
                        item
                            .trim()
                            .toLowerCase()
                    );

            const fileExtension =
                "." +
                file.name
                    .split(".")
                    .pop()
                    .toLowerCase();

            const mimeType =
                file.type.toLowerCase();

            const valid =
                accepted.includes(
                    mimeType
                ) ||
                accepted.includes(
                    fileExtension
                ) ||
                (
                    accepted.includes(
                        "image/*"
                    ) &&
                    mimeType.startsWith(
                        "image/"
                    )
                );

            if (!valid) {

                showError(
                    "Invalid File",
                    `Please select a valid ${field.label.toLowerCase()} file.`
                );

                event.target.value = "";

                return;
            }
        }


        // ---------------------------------------------
        // SAVE FILE
        // ---------------------------------------------

        handleChange(
            field.name,
            file
        );
    };


    // =================================================
    // SUBMIT
    // =================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (saving) {
            return;
        }

        setSaving(true);

        try {
            let payload = {
                ...form,
            };


            // -----------------------------------------
            // TRANSFORM
            // -----------------------------------------

            if (transformBeforeSubmit) {
                payload =
                    transformBeforeSubmit(
                        payload,
                        editingItem
                    );
            }


            // -----------------------------------------
            // UPDATE
            // -----------------------------------------

            if (editingItem) {
                await api.update(
                    editingItem.id,
                    payload
                );
            }

            // -----------------------------------------
            // CREATE
            // -----------------------------------------

            else {
                await api.create(
                    payload
                );
            }


            // -----------------------------------------
            // SUCCESS
            // -----------------------------------------

            await showSuccess(
                editingItem
                    ? "Updated Successfully"
                    : "Created Successfully",

                editingItem
                    ? `${title} updated successfully.`
                    : `${title} created successfully.`
            );


            closeModal();

            await loadItems();

        } catch (error) {

            console.error(
                `Failed to save ${title}:`,
                error
            );

            console.error(
                "Laravel response:",
                error.response?.data
            );


            // -----------------------------------------
            // VALIDATION ERRORS
            // -----------------------------------------

            const errors =
                error.response?.data
                    ?.errors;

            if (errors) {

                const html =
                    Object.entries(errors)
                        .map(
                            ([
                                field,
                                messages,
                            ]) => `
                                <div
                                    style="
                                        text-align:left;
                                        margin-bottom:8px;
                                    "
                                >
                                    <strong>
                                        ${escapeHtml(field)}
                                    </strong>

                                    <div
                                        style="
                                            color:#cbd5e1;
                                            margin-top:2px;
                                        "
                                    >
                                        ${messages
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
                                </div>
                            `
                        )
                        .join("");

                await Swal.fire({
                    ...swalBase,
                    icon: "error",
                    title: "Validation Error",
                    html,
                    confirmButtonText: "OK",
                    confirmButtonColor:
                        "#9333ea",
                });

            }

            // -----------------------------------------
            // GENERAL ERROR
            // -----------------------------------------

            else {

                await showError(
                    "Save Failed",
                    error.response?.data
                        ?.message ||
                    `Failed to save ${title.toLowerCase()}.`
                );
            }

        } finally {
            setSaving(false);
        }
    };


    // =================================================
    // DELETE
    // =================================================

    const handleDelete = async (
        item
    ) => {

        const result =
            await showWarning(
                `Delete ${title}?`,
                `Are you sure you want to delete this ${title.toLowerCase()}?`
            );

        if (!result.isConfirmed) {
            return;
        }

        try {

            await api.remove(
                item.id
            );

            await showSuccess(
                "Deleted Successfully",
                `${title} deleted successfully.`
            );

            await loadItems();

        } catch (error) {

            console.error(
                `Failed to delete ${title}:`,
                error
            );

            await showError(
                "Delete Failed",
                error.response?.data
                    ?.message ||
                `Failed to delete ${title.toLowerCase()}.`
            );
        }
    };


    // =================================================
    // SEARCH
    // =================================================

    const filteredItems =
        items.filter((item) => {

            if (!search.trim()) {
                return true;
            }

            const query =
                search
                    .toLowerCase()
                    .trim();

            return Object.values(
                item
            ).some(
                (value) => {

                    if (
                        value === null ||
                        value === undefined
                    ) {
                        return false;
                    }

                    return String(value)
                        .toLowerCase()
                        .includes(query);
                }
            );
        });

    const totalPages = Math.max(
        1,
        Math.ceil(filteredItems.length / pageSize)
    );

    const safePage = Math.min(currentPage, totalPages);

    const paginatedItems = filteredItems.slice(
        (safePage - 1) * pageSize,
        safePage * pageSize
    );

    const startItem = filteredItems.length > 0
        ? (safePage - 1) * pageSize + 1
        : 0;

    const endItem = Math.min(
        safePage * pageSize,
        filteredItems.length
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    useEffect(() => {
        setCurrentPage((page) => Math.min(page, totalPages));
    }, [totalPages]);


    // =================================================
    // INPUT CSS
    // =================================================

    const commonClass = `
        w-full
        rounded-xl
        border
        border-white/10
        bg-white/5
        px-4
        py-3
        text-white
        placeholder:text-slate-500
        outline-none
        backdrop-blur-xl
        transition-all
        focus:border-purple-500/60
        focus:bg-white/10
        focus:ring-2
        focus:ring-purple-500/20
    `;


    // =================================================
    // RENDER FIELD
    // =================================================

    const renderField = (
        field
    ) => {

        const value =
            form[field.name] ?? "";

        const wrapperClass =
            field.fullWidth
                ? "sm:col-span-2"
                : "";


        return (
            <div
                key={field.name}
                className={wrapperClass}
            >

                <label
                    className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-slate-300
                    "
                >
                    {field.label}

                    {field.required && (
                        <span className="ml-1 text-pink-400">
                            *
                        </span>
                    )}
                </label>


                {/* =====================================
                    FILE
                ====================================== */}

                {field.type ===
                    "file" ? (

                    <div className="space-y-3">

                        {/* EXISTING FILE */}

                        {editingItem &&
                            editingItem[
                            field.name
                            ] && (

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-white/5
                                        p-3
                                    "
                                >

                                    {isImageUrl(
                                        editingItem[
                                        field.name
                                        ]
                                    ) ? (

                                        <img
                                            src={
                                                editingItem[
                                                field.name
                                                ]
                                            }
                                            alt={
                                                field.label
                                            }
                                            className="
                                                h-16
                                                w-16
                                                rounded-lg
                                                border
                                                border-white/10
                                                object-cover
                                            "
                                        />

                                    ) : (

                                        <div
                                            className="
                                                flex
                                                h-16
                                                w-16
                                                items-center
                                                justify-center
                                                rounded-lg
                                                bg-white/5
                                            "
                                        >
                                            <FileText
                                                size={28}
                                                className="text-purple-400"
                                            />
                                        </div>
                                    )}


                                    <div className="min-w-0 flex-1">

                                        <p className="text-xs text-slate-500">
                                            Current{" "}
                                            {
                                                field.label
                                            }
                                        </p>

                                        <a
                                            href={
                                                editingItem[
                                                field.name
                                                ]
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="
                                                block
                                                truncate
                                                text-sm
                                                text-purple-400
                                                hover:text-purple-300
                                            "
                                        >
                                            View current file
                                        </a>

                                    </div>
                                </div>
                            )}


                        {/* NEW FILE */}

                        {value instanceof File && (

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    border-purple-500/30
                                    bg-purple-500/5
                                    p-3
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-purple-500/10
                                    "
                                >
                                    {value.type.startsWith(
                                        "image/"
                                    ) ? (
                                        <FileImage
                                            size={22}
                                            className="text-purple-400"
                                        />
                                    ) : (
                                        <FileText
                                            size={22}
                                            className="text-purple-400"
                                        />
                                    )}
                                </div>


                                <div className="min-w-0 flex-1">

                                    <p className="truncate text-sm font-medium text-white">
                                        {value.name}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        {formatFileSize(
                                            value.size
                                        )}
                                    </p>

                                </div>


                                <button
                                    type="button"
                                    onClick={() =>
                                        handleChange(
                                            field.name,
                                            null
                                        )
                                    }
                                    className="
                                        rounded-lg
                                        p-2
                                        text-slate-500
                                        transition
                                        hover:bg-red-500/10
                                        hover:text-red-400
                                    "
                                >
                                    <X size={17} />
                                </button>

                            </div>
                        )}


                        {/* UPLOAD */}

                        <label
                            htmlFor={`file-${field.name}`}
                            className="
                                flex
                                min-h-32
                                w-full
                                cursor-pointer
                                flex-col
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-dashed
                                border-white/10
                                bg-white/5
                                px-4
                                py-6
                                text-center
                                backdrop-blur-xl
                                transition
                                hover:border-purple-500/50
                                hover:bg-purple-500/5
                            "
                        >

                            <Upload
                                size={28}
                                className="mb-3 text-purple-400"
                            />

                            <span className="text-sm font-medium text-slate-300">
                                {value instanceof File
                                    ? "Choose another file"
                                    : `Upload ${field.label}`}
                            </span>

                            <span className="mt-1 text-xs text-slate-500">
                                {field.helpText ||
                                    `Maximum ${field.maxSizeMb ||
                                    10
                                    }MB`}
                            </span>

                        </label>


                        <input
                            id={`file-${field.name}`}
                            type="file"
                            accept={
                                field.accept ||
                                "*/*"
                            }
                            onChange={(e) =>
                                handleFileChange(
                                    field,
                                    e
                                )
                            }
                            className="hidden"
                        />

                    </div>

                ) : field.type ===
                    "textarea" ? (

                    <textarea
                        value={value}
                        onChange={(e) =>
                            handleChange(
                                field.name,
                                e.target.value
                            )
                        }
                        placeholder={
                            field.placeholder
                        }
                        required={
                            field.required
                        }
                        rows={
                            field.rows || 5
                        }
                        className={
                            commonClass
                        }
                    />

                ) : field.type === "select" ? (
                    <select
                        value={value}
                        onChange={(e) =>
                            handleChange(field.name, e.target.value)
                        }
                        required={field.required}
                        className={commonClass}
                    >
                        <option
                            value=""
                            style={{
                                color: "#0f172a",
                                backgroundColor: "#ffffff",
                            }}
                        >
                            {field.placeholder || "Select..."}
                        </option>

                        {(field.options || []).map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                style={{
                                    color: "#0f172a",
                                    backgroundColor: "#ffffff",
                                }}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>

                ) : field.type ===
                    "checkbox" ? (

                    <label
                        className="
                            flex
                            cursor-pointer
                            items-center
                            gap-3
                        "
                    >

                        <input
                            type="checkbox"
                            checked={Boolean(
                                value
                            )}
                            onChange={(e) =>
                                handleChange(
                                    field.name,
                                    e.target.checked
                                )
                            }
                            className="
                                h-5
                                w-5
                                rounded
                                border-white/10
                                bg-black/30
                                text-purple-600
                                focus:ring-purple-500
                            "
                        />

                        <span className="text-sm text-slate-300">
                            {field.checkboxLabel ||
                                field.label}
                        </span>

                    </label>

                ) : (

                    <input
                        type={
                            field.type ||
                            "text"
                        }
                        value={value}
                        onChange={(e) =>
                            handleChange(
                                field.name,
                                e.target.value
                            )
                        }
                        placeholder={
                            field.placeholder
                        }
                        required={
                            field.required
                        }
                        min={
                            field.min
                        }
                        max={
                            field.max
                        }
                        step={
                            field.step
                        }
                        className={
                            commonClass
                        }
                    />
                )}

            </div>
        );
    };


    // =================================================
    // PAGE
    // =================================================

    return (
        <div className="space-y-6">

            {/* =========================================
                HEADER
            ========================================== */}

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >

                <div>

                    <h1
                        className="
                            text-2xl
                            font-bold
                            bg-gradient-to-r
                            from-blue-400
                            via-purple-400
                            to-pink-400
                            bg-clip-text
                            text-transparent
                            sm:text-3xl
                        "
                    >
                        {title}
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        {description}
                    </p>

                </div>


                <button
                    type="button"
                    onClick={openCreate}
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
                        px-4
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

                    Add {title}
                </button>

            </div>


            {/* =========================================
                SEARCH
            ========================================== */}

            <div
                className="
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                "
            >

                <div className="relative flex-1">

                    <Search
                        size={18}
                        className="
                            pointer-events-none
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-slate-500
                        "
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        placeholder={`Search ${title.toLowerCase()}...`}
                        className="
                            w-full
                            rounded-xl
                            border
                            border-white/10
                            bg-white/5
                            px-4
                            py-3
                            pl-10
                            text-white
                            placeholder:text-slate-500
                            outline-none
                            backdrop-blur-xl
                            transition-all
                            focus:border-purple-500/60
                            focus:bg-white/10
                            focus:ring-2
                            focus:ring-purple-500/20
                        "
                    />

                </div>


                <button
                    type="button"
                    onClick={loadItems}
                    disabled={loading}
                    className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        px-5
                        py-3
                        text-slate-300
                        backdrop-blur-xl
                        transition
                        hover:border-purple-500/30
                        hover:bg-purple-500/10
                        hover:text-white
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    <RefreshCw
                        size={17}
                        className={
                            loading
                                ? "animate-spin"
                                : ""
                        }
                    />

                    Refresh
                </button>

            </div>


            {/* =========================================
                TABLE
            ========================================== */}

            <DataTable
                columns={columns}
                data={paginatedItems}
                loading={loading}
                onEdit={openEdit}
                onDelete={
                    api.remove
                        ? handleDelete
                        : undefined
                }
                emptyMessage={
                    emptyMessage
                }
            />

            {filteredItems.length > 0 && (
                <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-400">
                        Showing {startItem}–{endItem} of {filteredItems.length} skills
                    </p>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            disabled={safePage === 1}
                            onClick={() =>
                                setCurrentPage((page) => Math.max(1, page - 1))
                            }
                            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white disabled:opacity-40"
                        >
                            Previous
                        </button>

                        <span className="whitespace-nowrap text-sm text-slate-300">
                            Page {safePage} of {totalPages}
                        </span>

                        <button
                            type="button"
                            disabled={safePage === totalPages}
                            onClick={() =>
                                setCurrentPage((page) =>
                                    Math.min(totalPages, page + 1)
                                )
                            }
                            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}


            {/* =========================================
                MODAL
            ========================================== */}

            <Modal
                open={modalOpen}
                onClose={closeModal}
                title={
                    editingItem
                        ? `Edit ${title}`
                        : `Add ${title}`
                }
            >

                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="space-y-6"
                >

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-5
                            sm:grid-cols-2
                        "
                    >
                        {fields.map(
                            renderField
                        )}
                    </div>


                    {/* =================================
                        ACTIONS
                    ================================== */}

                    <div
                        className="
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
                                closeModal
                            }
                            disabled={
                                saving
                            }
                            className="
                                rounded-xl
                                border
                                border-white/10
                                bg-white/5
                                px-5
                                py-3
                                text-sm
                                font-medium
                                text-slate-300
                                transition
                                hover:bg-white/10
                                hover:text-white
                                disabled:opacity-50
                            "
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            disabled={
                                saving
                            }
                            className="
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
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            {saving
                                ? "Saving..."
                                : editingItem
                                    ? "Update"
                                    : "Create"}
                        </button>

                    </div>

                </form>

            </Modal>

        </div>
    );
}


// =====================================================
// IMAGE URL
// =====================================================

function isImageUrl(url) {
    if (
        !url ||
        typeof url !== "string"
    ) {
        return false;
    }

    return /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(
        url
    );
}


// =====================================================
// FILE SIZE
// =====================================================

function formatFileSize(bytes) {
    if (!bytes) {
        return "0 KB";
    }

    const kb =
        bytes / 1024;

    if (kb < 1024) {
        return `${kb.toFixed(1)} KB`;
    }

    return `${(
        kb / 1024
    ).toFixed(1)} MB`;
}


// =====================================================
// HTML ESCAPE
// =====================================================

function escapeHtml(value) {
    return String(value ?? "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
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