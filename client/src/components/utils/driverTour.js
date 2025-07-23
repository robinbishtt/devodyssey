import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const devOdysseyTour = () => {
    const driverObj = driver({
        popoverClass: "tour-custom",
        showProgress: true,
        overlayColor: "#000000a8",
        steps: [
            {
                element: "#navbar",
                popover: {
                    title: "Navigation",
                    description: "Use this to explore home, blogs, dashboard and publish.",
                    position: "bottom",
                },
            },
            {
                element: "#hero",
                popover: {
                    title: "Hero Section",
                    description: "Start your journey here.",
                    position: "bottom",
                },
                onNext: () => {
                    window.location.href = "/Home";
                },
            },
            {
                element: "#writeBtn",
                popover: {
                    title: "Write Blog",
                    description: "Click to publish your first blog.",
                    position: "bottom",
                },
                onNext: () => {
                    window.location.href = "/Write";
                },
            },
            {
                element: "#dashboardBtn",
                popover: {
                    title: "Dashboard",
                    description: "Track analytics, manage profile, and blogs published.",
                    position: "bottom",
                },
                onNext: () => {
                    window.location.href = "/Dashboard";
                },
            },
            {
                element: "#settingsTab",
                popover: {
                    title: "Theme & Settings",
                    description: "Choose your preferred theme and manage account settings here.",
                    position: "bottom",
                },
            },
        ],
    });

    driverObj.drive();
};
