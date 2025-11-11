import { describe, it, expect } from "vitest";
import {
    products,
    getAllHeroes,
    getAllVillains
} from "../data/products";

describe("Product Data", () => {

    it("exists and contains some number of items.", () => {
        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBeGreaterThan(0);
    });

    it("has a valid unique id, name, release date.", () => {
        for (const [, product] of products.entries()) {
            expect(product.id.trim().length).toBeGreaterThan(0);
            expect(products.flatMap(p => p.id === product.id)).toEqual(1);
            expect(product.name.trim().length).toBeGreaterThan(0);
            expect(typeof Date.parse(product.releaseDate)).toEqual(typeof Date);
        }
    });

    it("has valid hero entries", () => {
        const heroList = getAllHeroes();
        expect(heroList.length).toBeGreaterThan(0);

        for (const [, product] of products.entries()) {
            product.heroes.forEach(hero => {
                expect(hero.id.trim().length).toBeGreaterThan(0);
                expect(heroList.flatMap(h => h.id === hero.id)).toEqual(1);
                expect(hero.name.trim().length).toBeGreaterThan(0);
                expect(hero.alterEgo.trim().length).toBeGreaterThan(0);
                expect(hero.nemesis.trim().length).toBeGreaterThan(0);
                expect(hero.prebuiltAspects?.length).toBeGreaterThan(0);
            });
        }
    });

    it("has valid villain entries", () => {
        const villainList = getAllVillains();
        expect(villainList.length).toBeGreaterThan(0);

        for (const [, product] of products.entries()) {
            product.villains.forEach(villain => {
                expect(villain.name.trim().length).toBeGreaterThan(0);
                expect(villain.requiredSets.length).toBeGreaterThan(0);
            });
        }
    });
});