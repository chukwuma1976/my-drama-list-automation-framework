export const expectedHeaders = [

    {
        header: "content-type",
        value: "application/json",
        type: "contains"
    },

    {
        header: "cache-control",
        value: "public",
        type: "contains"
    },

    {
        header: "content-encoding",
        value: "br",
        type: "equals"
    },

    {
        header: "strict-transport-security",
        value: "max-age=",
        type: "contains"
    },

    {
        header: "date",
        type: "exists"
    },

    {
        header: "server",
        value: "Vercel",
        type: "equals"
    }

];