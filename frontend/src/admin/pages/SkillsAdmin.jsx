import CrudPage from "../components/CrudPage";
import { createCrudApi } from "../../api/crud";

const api = createCrudApi("/admin/skills");

export default function SkillsAdmin() {
    return (
        <CrudPage
            title="Skills"
            description="Manage your technical and professional skills."
            api={api}
            columns={[
                {
                    key: "name",
                    label: "Name",
                },
                {
                    key: "category",
                    label: "Category",
                },
                {
                    key: "percentage",
                    label: "Percentage",
                    render: (item) =>
                        `${item.percentage ?? 0}%`,
                },
                {
                    key: "icon",
                    label: "Icon",
                    render: (item) => {
                        if (!item.icon) {
                            return "—";
                        }

                        if (
                            typeof item.icon === "string" &&
                            (
                                item.icon.startsWith("http://") ||
                                item.icon.startsWith("https://") ||
                                item.icon.startsWith("/storage/")
                            )
                        ) {
                            return (
                                <img
                                    src={item.icon}
                                    alt={item.name}
                                    className="h-8 w-8 rounded object-contain"
                                />
                            );
                        }

                        return (
                            <span className="text-slate-300">
                                {item.icon}
                            </span>
                        );
                    },
                },
                {
                    key: "is_active",
                    label: "Active",
                    render: (item) =>
                        item.is_active
                            ? "Yes"
                            : "No",
                },
            ]}
            fields={[
                {
                    name: "name",
                    label: "Skill Name",
                    required: true,
                    placeholder: "Laravel",
                },

                {
                    name: "category",
                    label: "Category",
                    type: "select",
                    required: true,
                    placeholder: "Select a category",
                    options: [
                        {
                            label: "Programming Languages",
                            value: "Programming Languages",
                        },
                        {
                            label: "Frameworks & Libraries",
                            value: "Frameworks & Libraries",
                        },
                        {
                            label: "Tools & Technologies",
                            value: "Tools & Technologies",
                        },
                        {
                            label: "Soft Skills",
                            value: "Soft Skills",
                        },
                    ],
                },

                {
                    name: "percentage",
                    label: "Percentage",
                    type: "number",
                    min: 0,
                    max: 100,
                    defaultValue: 0,
                },

                {
                    name: "icon",
                    label: "Icon",
                    type: "file",
                    accept:
                        "image/png,image/jpeg,image/webp,image/svg+xml",
                    maxSizeMb: 2,
                    helpText:
                        "PNG, JPG, WEBP or SVG • Maximum 2MB",
                },

                {
                    name: "is_active",
                    label: "Active",
                    type: "checkbox",
                    defaultValue: true,
                    checkboxLabel:
                        "Skill is active",
                },
            ]}
        />
    );
}