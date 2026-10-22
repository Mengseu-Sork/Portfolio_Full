import CrudPage from "../components/CrudPage";
import { createCrudApi } from "../../api/crud";

const api = createCrudApi(
    "/admin/experiences"
);

export default function ExperiencesAdmin() {
    return (
        <CrudPage
            title="Experience"
            description="Manage your professional experience."
            api={api}
            columns={[
                {
                    key: "company",
                    label: "Company",
                },
                {
                    key: "position",
                    label: "Position",
                },
                {
                    key: "location",
                    label: "Location",
                },
            ]}
            fields={[
                {
                    name: "company",
                    label: "Company",
                    required: true,
                },
                {
                    name: "position",
                    label: "Position",
                    required: true,
                },
                {
                    name: "location",
                    label: "Location",
                    fullWidth: true,
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

                    disabledWhen: (
                        form
                    ) => form.is_current === true,
                },
                
                {
                    name: "description",
                    label: "Description",
                    type: "textarea",
                    fullWidth: true,
                },

                {
                    name: "is_current",
                    label: "Current",
                    type: "checkbox",

                    // IMPORTANT
                    defaultValue: false,

                    checkboxLabel:
                        "I currently work here",
                    fullWidth: true,
                },

            ]}

            transformBeforeSubmit={(
                payload
            ) => {
                const data = {
                    ...payload,
                };

                /*
                 * Always send boolean.
                 */
                data.is_current =
                    Boolean(
                        data.is_current
                    );

                /*
                 * If current, remove end date.
                 */
                if (
                    data.is_current
                ) {
                    data.end_date =
                        null;
                }

                return data;
            }}
        />
    );
}