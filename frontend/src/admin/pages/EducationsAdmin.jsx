import CrudPage from "../components/CrudPage";
import { createCrudApi } from "../../api/crud";

const api = createCrudApi(
    "/admin/educations"
);

export default function EducationsAdmin() {
    return (
        <CrudPage
            title="Education"
            description="Manage your education history."
            api={api}
            columns={[
                {
                    key: "institution",
                    label: "Institution",
                },
                {
                    key: "degree",
                    label: "Degree",
                },
                {
                    key: "field_of_study",
                    label: "Field",
                },
                {
                    key: "start_date",
                    label: "Start",
                    render: (item) =>
                        formatDate(
                            item.start_date
                        ),
                },

                {
                    key: "end_date",
                    label: "End",
                    render: (item) =>
                        item.end_date
                            ? formatDate(
                                item.end_date
                            )
                            : "Present",
                },
            ]}
            fields={[
                {
                    name: "institution",
                    label: "Institution",
                    required: true,
                    fullWidth: true,
                },
                {
                    name: "degree",
                    label: "Degree",
                    required: true,
                },
                {
                    name: "field_of_study",
                    label: "Field of Study",
                },
                {
                    name: "start_date",
                    label: "Start Date",
                    type: "date",
                },
                {
                    name: "end_date",
                    label: "End Date",
                    type: "date",
                },
                {
                    name: "description",
                    label: "Description",
                    type: "textarea",
                    fullWidth: true,
                },
            ]}
        />
    );
}

function formatDate(date) {
    if (!date) {
        return "—";
    }

    const parsed = new Date(date);

    if (
        Number.isNaN(
            parsed.getTime()
        )
    ) {
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