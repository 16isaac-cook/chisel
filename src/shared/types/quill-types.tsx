import { ThemedRemixIcon } from "@components/themed-remixicon";
import type { ReactNode } from "react";

export type WorldGenre =
    | "Fantasy"
    | "Sci-Fi"
    | "Cosmic Horror"
    | "Steampunk"
    | "Superhero"
    | "Western"
    | "Historic"
    | "Modern"
    | "Apocalyptic"
    | "Dystopian"
    | "Other";

export const worldGenres: Record<
    string,
    { name: WorldGenre; icon: ReactNode }
> = {
    fantasy: { name: "Fantasy", icon: <ThemedRemixIcon icon="Sword" /> },
    scifi: { name: "Sci-Fi", icon: <ThemedRemixIcon icon="Aliens" /> },
    cosmic: { name: "Cosmic Horror", icon: <ThemedRemixIcon icon="Brain" /> },
    steampunk: {
        name: "Steampunk",
        icon: <ThemedRemixIcon icon="Cog" library="lucide" />,
    },
    superhero: {
        name: "Superhero",
        icon: <ThemedRemixIcon icon="Dna" library="lucide" />,
    },
    western: { name: "Western", icon: <ThemedRemixIcon icon="Cactus" /> },
    historic: { name: "Historic", icon: <ThemedRemixIcon icon="BookOpen" /> },
    modern: { name: "Modern", icon: <ThemedRemixIcon icon="Building" /> },
    apocalyptic: {
        name: "Apocalyptic",
        icon: <ThemedRemixIcon icon="Skull" />,
    },
    other: { name: "Other", icon: <ThemedRemixIcon icon="Sparkling2" /> },
} as const;

export type World = {
    worldId: string;
    name: string;
    genre: keyof typeof worldGenres;
    author?: string;
    dateCreated: string;
    dateUpdated: string;
};

export type WorldObjects =
    | "Building"
    | "Celestial Body"
    | "Character"
    | "Condition"
    | "Conflict"
    | "Country"
    | "Currency"
    | "Deity"
    | "Document"
    | "Ethnicity"
    | "Item"
    | "Landmark"
    | "Language"
    | "Material"
    | "Military"
    | "Monster"
    | "Myth"
    | "Natural Law"
    | "Natural Region"
    | "Organization"
    | "Profession"
    | "Religion"
    | "Rule"
    | "Settlement"
    | "Species"
    | "Spell"
    | "Technology"
    | "Title"
    | "Tradition"
    | "Vehicle";

export const worldObjects: Record<
    string,
    { name: WorldObjects; plural?: string; icon: ReactNode }
> = {
    building: { name: "Building", icon: <ThemedRemixIcon icon="Home3" /> },
    celestialBody: {
        name: "Celestial Body",
        plural: "Celestial Bodies",
        icon: <ThemedRemixIcon icon="Moon" />,
    },
    character: { name: "Character", icon: <ThemedRemixIcon icon="User" /> },
    condition: { name: "Condition", icon: <ThemedRemixIcon icon="Alert" /> },
    conflict: { name: "Conflict", icon: <ThemedRemixIcon icon="Sword" /> },
    country: {
        name: "Country",
        plural: "Countries",
        icon: <ThemedRemixIcon icon="Government" />,
    },
    currency: {
        name: "Currency",
        plural: "Currencies",
        icon: <ThemedRemixIcon icon="Coins" />,
    },
    deity: {
        name: "Deity",
        plural: "Deities",
        icon: <ThemedRemixIcon icon="Psychotherapy" />,
    },
    document: { name: "Document", icon: <ThemedRemixIcon icon="FilePaper2" /> },
    ethnicity: {
        name: "Ethnicity",
        plural: "Ethnicities",
        icon: <ThemedRemixIcon icon="Walk" />,
    },
    item: { name: "Item", icon: <ThemedRemixIcon icon="Key2" /> },
    landmark: { name: "Landmark", icon: <ThemedRemixIcon icon="Building2" /> },
    language: {
        name: "Language",
        icon: <ThemedRemixIcon icon="CharacterRecognition" />,
    },
    material: { name: "Material", icon: <ThemedRemixIcon icon="Box3" /> },
    military: {
        name: "Military",
        plural: "Militaries",
        icon: <ThemedRemixIcon icon="Honour" />,
    },
    monster: { name: "Monster", icon: <ThemedRemixIcon icon="Skull2" /> },
    myth: { name: "Myth", icon: <ThemedRemixIcon icon="Book2" /> },
    naturalLaw: {
        name: "Natural Law",
        icon: <ThemedRemixIcon icon="Flashlight" />,
    },
    naturalRegion: {
        name: "Natural Region",
        icon: <ThemedRemixIcon icon="Landscape" />,
    },
    organization: {
        name: "Organization",
        icon: <ThemedRemixIcon icon="Team" />,
    },
    profession: {
        name: "Profession",
        icon: <ThemedRemixIcon icon="AccountBox" />,
    },
    religion: { name: "Religion", icon: <ThemedRemixIcon icon="Sparkling2" /> },
    rule: { name: "Rule", icon: <ThemedRemixIcon icon="Dice" /> },
    settlement: {
        name: "Settlement",
        icon: <ThemedRemixIcon icon="Community" />,
    },
    species: {
        name: "Species",
        plural: "Species",
        icon: <ThemedRemixIcon icon="Aliens" />,
    },
    spell: { name: "Spell", icon: <ThemedRemixIcon icon="Fire" /> },
    technology: {
        name: "Technology",
        plural: "Technologies",
        icon: <ThemedRemixIcon icon="Flask" />,
    },
    title: { name: "Title", icon: <ThemedRemixIcon icon="VipCrown" /> },
    tradition: {
        name: "Tradition",
        icon: <ThemedRemixIcon icon="ChatHistory" />,
    },
    vehicle: { name: "Vehicle", icon: <ThemedRemixIcon icon="Riding" /> },
} as const;

export type WorldObject = {
    objectId: string;
    type: keyof typeof worldObjects;
    name: string;
    description?: string;
    gmNotes?: string;
    link?: boolean; // whether to allow this object to be linked to other objects
    parent?: string; // the objectId of the parent object, if it has one
    tags?: string[];
    dateCreated: string;
    dateUpdated: string;
};
