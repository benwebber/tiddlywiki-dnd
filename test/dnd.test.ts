/* tslint:disable:max-line-length object-literal-sort-keys */
import * as dnd from "../src/files/dnd";

import StatBlockFactory from "./factories/statblock";


describe("StatBlock", () => {
  [
    {size: "medium", expected: "medium"},
    {size: "medium", type: "humanoid", tags: "any race", alignment: "any alignment", expected: "medium humanoid (any race), any alignment"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for size = ${example.size}, type = ${example.type}, tags = ${example.tags}, alignment = ${example.alignment}`, () => {
      const creature = StatBlockFactory.build({
        size: example.size,
        type: example.type,
        tags: example.tags,
        alignment: example.alignment,
      });
      expect(creature.description).toBe(example.expected);
    });
  });
});


describe("capitalize", () => {
  [
    {description: "small beast, unaligned", expected: "Small beast, unaligned"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for description "${example.description}"`, () => {
      expect(dnd.capitalize(example.description)).toBe(example.expected);
    });
  });
});


describe("hit", () => {
  [
    {
      args: ["1d8", dnd.DamageType.Slashing],
      expected: "//<<dnd._lingo StatBlock/Action/Hit>>:// 4 (1d8) <<dnd._lingo Damage/Type/Slashing>>."},
    {
      args: ["1d8", dnd.DamageType.Slashing, "1d4", dnd.DamageType.Fire],
      expected: "//<<dnd._lingo StatBlock/Action/Hit>>:// 4 (1d8) <<dnd._lingo Damage/Type/Slashing>> <<dnd._lingo StatBlock/Action/Plus>> 2 (1d4) <<dnd._lingo Damage/Type/Fire>>.",
    },
    {
      args: ["1d8", dnd.DamageType.Slashing, "", "", "1d10", dnd.DamageType.Slashing, "", "", "if wielded with two hands"],
      expected: "//<<dnd._lingo StatBlock/Action/Hit>>:// 4 (1d8) <<dnd._lingo Damage/Type/Slashing>>, <<dnd._lingo StatBlock/Action/Or>> 5 (1d10) <<dnd._lingo Damage/Type/Slashing>> if wielded with two hands.",
    },
    {
      args: ["1d8", dnd.DamageType.Slashing, "1d4", dnd.DamageType.Fire, "1d10", dnd.DamageType.Slashing, "1d4", dnd.DamageType.Fire, "if wielded with two hands"],
      expected: "//<<dnd._lingo StatBlock/Action/Hit>>:// 4 (1d8) <<dnd._lingo Damage/Type/Slashing>> <<dnd._lingo StatBlock/Action/Plus>> 2 (1d4) <<dnd._lingo Damage/Type/Fire>>, <<dnd._lingo StatBlock/Action/Or>> 5 (1d10) <<dnd._lingo Damage/Type/Slashing>> <<dnd._lingo StatBlock/Action/Plus>> 2 (1d4) <<dnd._lingo Damage/Type/Fire>> if wielded with two hands.",
    },
    {
      args: ["1d8", dnd.DamageType.Slashing, "1d4", dnd.DamageType.Fire, "1d10", dnd.DamageType.Slashing, "1d4", dnd.DamageType.Fire, "if wielded with two hands", "and the target must make a Strength saving throw (DC 10) or be knocked prone"],
      expected: "//<<dnd._lingo StatBlock/Action/Hit>>:// 4 (1d8) <<dnd._lingo Damage/Type/Slashing>> <<dnd._lingo StatBlock/Action/Plus>> 2 (1d4) <<dnd._lingo Damage/Type/Fire>>, <<dnd._lingo StatBlock/Action/Or>> 5 (1d10) <<dnd._lingo Damage/Type/Slashing>> <<dnd._lingo StatBlock/Action/Plus>> 2 (1d4) <<dnd._lingo Damage/Type/Fire>> if wielded with two hands, and the target must make a Strength saving throw (DC 10) or be knocked prone.",
    },
  ].forEach((example) => {
    it(`should return "${example.expected}"`, () => {
      const damage = example.args[0] as string;
      const damageType = example.args[1] as dnd.DamageType;
      const extraDamage = example.args[2] as string;
      const extraDamageType = example.args[3] as dnd.DamageType;
      const condDamage = example.args[4] as string;
      const condDamageType = example.args[5] as dnd.DamageType;
      const extraCondDamage = example.args[6] as string;
      const extraCondDamageType = example.args[7] as dnd.DamageType;
      const when = example.args[8] as string;
      const effect = example.args[9] as string;
      expect(dnd.hit(damage, damageType, extraDamage, extraDamageType, condDamage, condDamageType, extraCondDamage, extraCondDamageType, when, effect)).toBe(example.expected);
    });
  });
});


describe("weaponAttack", () => {
  [
    {
      args: [dnd.AttackType.Melee, "+3", "5 ft."],
      expected: "//<<dnd._lingo StatBlock/Action/Melee>>:// +3 <<dnd._lingo StatBlock/Action/ToHit>>, <<dnd._lingo StatBlock/Action/Reach>> 5 ft., <<dnd._lingo StatBlock/Action/DefaultTarget>>.",
    },
    {
      args: [dnd.AttackType.Melee, "+3", "10 ft.", "", "two targets"],
      expected: "//<<dnd._lingo StatBlock/Action/Melee>>:// +3 <<dnd._lingo StatBlock/Action/ToHit>>, <<dnd._lingo StatBlock/Action/Reach>> 10 ft., two targets.",
    },
    {
      args: [dnd.AttackType.Ranged, "+3", "", "20/300 ft.", ""],
      expected: "//<<dnd._lingo StatBlock/Action/Ranged>>:// +3 <<dnd._lingo StatBlock/Action/ToHit>>, <<dnd._lingo StatBlock/Action/Range>> 20/300 ft., <<dnd._lingo StatBlock/Action/DefaultTarget>>.",
    },
    {
      args: [dnd.AttackType.Ranged, "+3", "", "20/300 ft.", "one target"],
      expected: "//<<dnd._lingo StatBlock/Action/Ranged>>:// +3 <<dnd._lingo StatBlock/Action/ToHit>>, <<dnd._lingo StatBlock/Action/Range>> 20/300 ft., one target.",
    },
    {
      args: [dnd.AttackType.Ranged, "+3", "not used", "20/300 ft.", "one target"],
      expected: "//<<dnd._lingo StatBlock/Action/Ranged>>:// +3 <<dnd._lingo StatBlock/Action/ToHit>>, <<dnd._lingo StatBlock/Action/Range>> 20/300 ft., one target.",
    },
    {
      args: [dnd.AttackType.MeleeOrRanged, "+3", "10 ft.", "10/30 ft.", "one target"],
      expected: "//<<dnd._lingo StatBlock/Action/MeleeOrRanged>>:// +3 <<dnd._lingo StatBlock/Action/ToHit>>, <<dnd._lingo StatBlock/Action/Reach>> 10 ft. <<dnd._lingo StatBlock/Action/Or>> <<dnd._lingo StatBlock/Action/Range>> 10/30 ft., one target.",
    },
  ].forEach((example) => {
    it(`should return "${example.expected}" for (${example.args[0]}, ${example.args[1]}, ${example.args[2]}, ${example.args[3]}, ${example.args[4]})`, () => {

      const attackType = example.args[0] as dnd.AttackType;
      const mod = example.args[1] as string;
      const reach = example.args[2] as string;
      const range = example.args[3] as string;
      const target = example.args[4] as string;
      expect(dnd.weaponAttack(attackType, mod, reach, range, target)).toBe(example.expected);
    });
  });
});
