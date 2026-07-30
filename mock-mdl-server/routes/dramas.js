import express from 'express';
import * as fs from 'fs';

const router = express.Router();
const file = "./allDramas.json";

const watchStatuses = [
    "Currently watching",
    "Completed",
    "On-hold",
    "Dropped",
    "Plan to watch",
    "Undecided",
    "Not Interested"
];

// Mock database
let dramas = [];
fs.readFile(file, (error, data) => {
    if (error) {
        console.log('Could not read file');
        throw error;
    }
    dramas = JSON.parse(data) || [];
});

function writeJSON(dramas) {
    const data = JSON.stringify(dramas, null, 2);
    fs.writeFile(file, data, error => {
        if (error) {
            console.log('Could not write file');
            throw error;
        } else console.log('File written successfully');
    })
}

// Health check
router.get('/health', (req, res) => {
    res.status(200).send({ "success": true });
})

// Getting the list of dramas from the mock database
router.get('/', (req, res) => {
    res.status(200).send({
        "username": "mdltester",
        "user_id": "mdltester",
        "dramas": dramas,
        "total": dramas.length,
        "url": "https://mydramalist.com/dramalist/mdltester"
    });
})

// Getting a drama from the mock database
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const drama = dramas.find(drama => drama.slug === id);

    if (drama)
        res.status(200).send(drama);
    else return res.status(404).send({ message: "Drama not found" });
})

// Adding a new drama to our mock database
router.post('/', (req, res) => {
    const drama = req.body;

    const keys = ["title", "slug", "status", "rating", "image", "url"];
    let errors = [];
    const existing = dramas.find(d => d.slug === drama.slug);
    const allowedWatchStatus = watchStatuses.map(status => status.toLowerCase).includes(drama.status.toLowerCase());

    if (existing)
        return res.status(409).send({ message: "Drama already exists." });

    if (payload.status && !allowedWatchStatus) {
        return res.status(422).send({
            message: "Invalid status"
        });
    }

    if (payload.rating) {
        const rating = Number(payload.rating);

        if (Number.isNaN(rating) || rating < 0 || rating > 10)
            return res.status(422).send({
                message: "Rating must be between 0 and 10"
            });
    }

    for (const key of keys) {
        if (!drama[key])
            errors.push(`${key} must be present`);
        if (typeof drama[key] !== "string")
            errors.push(`${key} must be a string`);
    }

    if (errors.length > 0)
        return res.status(422).send({ message: "Unprocessable entity", "errors": errors });
    else {
        dramas.push(drama);
        writeJSON(dramas);
        return res.status(201).send(drama);
    }
})

// Changing an existing drama in our mock database
router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const payload = req.body;

    const drama = dramas.find(drama => drama.slug === id);

    if (drama) {
        //Ensure that only the status and rating can be changed
        const sanitizedPayload = {
            status: payload.status || "",
            rating: payload.rating || ""
        }

        dramas = dramas.map(drama => drama.slug === id ? { ...drama, ...sanitizedPayload } : drama);
        const updatedDrama = dramas.find(d => d.slug === id);

        writeJSON(dramas);
        return res.status(200).send(updatedDrama);
    } else {
        return res.status(404).send({ message: "Drama not found" });
    }

})

// Deleting a drama from our mock database
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const drama = dramas.find(drama => drama.slug === id);

    if (!drama)
        return res.status(404).send({ "message": "Not found" })

    dramas = dramas.filter(drama => drama.slug !== id)
    writeJSON(dramas);
    res.sendStatus(204);

})

export default router