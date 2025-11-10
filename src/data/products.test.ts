import { describe, it, expect } from "vitest";
import {
    products,
    getAllHeroes,
    getAllVillains,
    getAllAspects,
    getAllModularSets,
    getHeroById,
    getVillainByName
} from "../data/products";

describe("Product Data", () => {

    it("Contains valid data", () => {
        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBeGreaterThan(0);

        for (const [idx, product] of products.entries()) {
            //Product Should Not Be Null or Defined
            expect(product).toBeTypeOf('object');
            expect(product).not.toBeNullable();

            //Ensure No Null or Undefined Data
            expect(product.id).not.toBeNullable();
            expect(product.name).not.toBeNullable();
            expect(product.type).not.toBeNullable();
            expect(product.releaseDate).not.toBeNullable();
            expect(product.heroes).not.toBeNullable();
            expect(product.villains).not.toBeNullable();
            expect(product.modularSets).not.toBeNullable();
            expect(product.standardSets).not.toBeNullable();
            expect(product.expertSets).not.toBeNullable();
            expect(product.aspects).not.toBeNullable();

            //Check String Fields
        }
    });

    it("contains some amount of heroes", () => {
        const heroArr = getAllHeroes();
        expect(heroArr.length).toBeGreaterThan(0);
    });

    it("contains some amount of villains", () => {
        const villainArr = getAllVillains();
        expect(villainArr.length).toBeGreaterThan(0);
    });

    it("contains all six known aspects", () => {
        const aspectArr = getAllAspects();
        expect(aspectArr.length).equals(6);
    });

    it("contains some amount of modular sets", () => {
        const modSetsArr = getAllModularSets();
        expect(modSetsArr.length).toBeGreaterThan(0);
    });

    it("fetches hero data with valid id", () => {
        const heroData = getHeroById('core-set-2019-spider-man');
        expect(heroData).not.toBeTypeOf("undefined");
    });

    it("fetches villain data with valid name", () => {
        const villainData = getVillainByName('Rhino');
        expect(villainData).not.toBeTypeOf("undefined");
    });
});