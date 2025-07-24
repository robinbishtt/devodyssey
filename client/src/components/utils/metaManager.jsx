import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pageMeta = {
    "/": {title: "DevOdyssey", description: "Explore DevOdyssey - A blog platform for developers"},
    "/home": { title: "Home | DevOdyssey", description: "Explore DevOdyssey's content hub" },
    "/dashboard": { title: "Dashboard | DevOdyssey", description: "Your personalized dashboard" },
    "/write": { title: "Write | DevOdyssey", description: "Start sharing your ideas" },
    "/allblogs": { title: "Blogs | DevOdyssey", description: "Browse all blog posts" },
};

export default function MetaManager() {
    const { pathname } = useLocation();
    const lowerPath = pathname.toLowerCase();
    const { title, description } = pageMeta[lowerPath] || { title: "DevOdyssey", description: "" };

    useEffect(() => {
        document.title = title;

        let metaDesc = document.querySelector("meta[name='description']");
        if (!metaDesc) {
            metaDesc = document.createElement("meta");
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = description;

        let keywordsMeta = document.querySelector("meta[name='keywords']");
        if (!keywordsMeta) {
            keywordsMeta = document.createElement("meta");
            keywordsMeta.name = "keywords";
            document.head.appendChild(keywordsMeta);
        }
        keywordsMeta.content = "DevOdyssey, blogs, writing, dashboard";

        if (pathname.includes("/blog")) {
            const slug = pathname.split("/").pop();
            const decodeSlug = decodeURIComponent(slug);
            const blogTitle = decodeSlug.replace(/-/g, " ").replace(/^\w/, c => c.toUpperCase());
            document.title = `${blogTitle} | DevOdyssey`;
            metaDesc.content = `Read ${blogTitle} on DevOdyssey`;
        }
    }, [pathname, title, description]);

    return null;
}
