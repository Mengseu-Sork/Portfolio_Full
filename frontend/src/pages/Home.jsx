import {
    useEffect,
    useState,
} from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import Hero from "../sections/Hero";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Services from "../sections/Services";
import Projects from "../sections/Projects";
import Experience from "../sections/Experience";
import Education from "../sections/Education";
import Contact from "../sections/Contact";

import { getProfile } from "../api/profile";
import { getSkills } from "../api/skills";
import { getServices } from "../api/services";
import { getProjects } from "../api/projects";
import { getExperiences } from "../api/experiences";
import { getEducations } from "../api/educations";
import { getSocialLinks } from "../api/socialLinks";

const extractData = (response) => {
    if (Array.isArray(response)) {
        return response;
    }

    if (Array.isArray(response?.data)) {
        return response.data;
    }

    if (Array.isArray(response?.data?.data)) {
        return response.data.data;
    }

    return [];
};

const extractSingle = (response) => {
    if (response?.data) {
        return response.data;
    }

    return response || null;
};

export default function Home() {
    const [profile, setProfile] = useState(null);

    const [skills, setSkills] = useState([]);
    const [services, setServices] = useState([]);
    const [projects, setProjects] = useState([]);
    const [experiences, setExperiences] =
        useState([]);
    const [educations, setEducations] =
        useState([]);
    const [socialLinks, setSocialLinks] =
        useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPortfolio = async () => {
            try {
                setLoading(true);
                setError("");

                const [
                    profileResponse,
                    skillsResponse,
                    servicesResponse,
                    projectsResponse,
                    experiencesResponse,
                    educationsResponse,
                    socialLinksResponse,
                ] = await Promise.all([
                    getProfile(),
                    getSkills(),
                    getServices(),
                    getProjects(),
                    getExperiences(),
                    getEducations(),
                    getSocialLinks(),
                ]);

                setProfile(
                    extractSingle(
                        profileResponse
                    )
                );

                setSkills(
                    extractData(skillsResponse)
                );

                setServices(
                    extractData(servicesResponse)
                );

                setProjects(
                    extractData(projectsResponse)
                );

                setExperiences(
                    extractData(
                        experiencesResponse
                    )
                );

                setEducations(
                    extractData(
                        educationsResponse
                    )
                );

                setSocialLinks(
                    extractData(
                        socialLinksResponse
                    )
                );
            } catch (err) {
                console.error(
                    "Portfolio API error:",
                    err
                );

                setError(
                    err?.response?.data?.message ||
                        "Unable to load portfolio data."
                );
            } finally {
                setLoading(false);
            }
        };

        loadPortfolio();
    }, []);

    if (loading) {
        return (
            <Loading text="Loading portfolio..." />
        );
    }

    if (error && !profile) {
        return (
            <div className="min-h-screen bg-[#02030a] px-4 py-20">
                <div className="mx-auto max-w-xl">
                    <ErrorMessage
                        message={error}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#02030a] text-white">

            <Navbar profile={profile} />

            <main>

                <Hero
                    profile={profile}
                    socialLinks={socialLinks}
                />

                <About
                    profile={profile}
                />

                <Skills
                    skills={skills}
                />

                <Services
                    services={services}
                />

                <Projects
                    projects={projects}
                />

                <Experience
                    experiences={experiences}
                />

                <Education
                    educations={educations}
                />

                <Contact
                    profile={profile}
                />

            </main>

            <Footer
                profile={profile}
                socialLinks={socialLinks}
            />

        </div>
    );
}