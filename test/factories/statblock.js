import {Factory} from "rosie";

import {StatBlock} from "../../src/plugins/dnd/dnd";


export default new Factory()
  .attrs({
    size: "medium",
    type: "humanoid",
    alignment: "any alignment",
    ac: 10,
    hp: "1d8",
    speed: "30 ft.",
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10,
    senses: "passive Perception 10",
    languages: "any one language (usually Common)",
    challenge: "0 (10 XP)",
    tags: "any race",
  })
  .after((factory) => {
    // Rosie can pass factory attributes to a constructor function, but the
    // constructor must accept an object instead of positional arguments.
    // Pass the factory values to the StatBlock constructor explicitly.
    return new StatBlock(
      factory.size,
      factory.type,
      factory.alignment,
      factory.ac,
      factory.hp,
      factory.speed,
      factory.str,
      factory.dex,
      factory.con,
      factory.int,
      factory.wis,
      factory.cha,
      factory.senses,
      factory.languages,
      factory.challenge,
      factory.tags,
      factory.saves,
      factory.skills,
      factory.dimm,
      factory.dres,
      factory.dvul,
      factory.cimm,
      factory.cres,
      factory.cvul
    );
  });
