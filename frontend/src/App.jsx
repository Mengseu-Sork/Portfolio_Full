import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

import Home from "./pages/Home";

import Login from "./admin/Login";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedRoute from "./admin/ProtectedRoute";

import ProfileAdmin from "./admin/pages/ProfileAdmin";
import ProjectsAdmin from "./admin/pages/ProjectsAdmin";
import SkillsAdmin from "./admin/pages/SkillsAdmin";
import ServicesAdmin from "./admin/pages/ServicesAdmin";
import ExperiencesAdmin from "./admin/pages/ExperiencesAdmin";
import EducationsAdmin from "./admin/pages/EducationsAdmin";
import SocialLinksAdmin from "./admin/pages/SocialLinksAdmin";
import ContactMessagesAdmin from "./admin/pages/ContactMessagesAdmin";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/admin/login"
                    element={<Login />}
                />

                {/* Protected Admin */}
                <Route
                    element={
                        <ProtectedRoute />
                    }
                >

                    <Route
                        path="/admin"
                        element={
                            <AdminLayout />
                        }
                    >

                        {/* Dashboard */}
                        <Route
                            index
                            element={
                                <AdminDashboard />
                            }
                        />

                        {/* Profile */}
                        <Route
                            path="profile"
                            element={
                                <ProfileAdmin />
                            }
                        />

                        {/* Projects */}
                        <Route
                            path="projects"
                            element={
                                <ProjectsAdmin />
                            }
                        />

                        {/* Skills */}
                        <Route
                            path="skills"
                            element={
                                <SkillsAdmin />
                            }
                        />

                        {/* Services */}
                        <Route
                            path="services"
                            element={
                                <ServicesAdmin />
                            }
                        />

                        {/* Experience */}
                        <Route
                            path="experiences"
                            element={
                                <ExperiencesAdmin />
                            }
                        />

                        {/* Education */}
                        <Route
                            path="educations"
                            element={
                                <EducationsAdmin />
                            }
                        />

                        {/* Social Links */}
                        <Route
                            path="social-links"
                            element={
                                <SocialLinksAdmin />
                            }
                        />

                        {/* Messages */}
                        <Route
                            path="contact-messages"
                            element={
                                <ContactMessagesAdmin />
                            }
                        />

                    </Route>

                </Route>


            </Routes>
        </BrowserRouter>
    );
}