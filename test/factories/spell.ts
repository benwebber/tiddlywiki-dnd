import {Factory} from "rosie";

import {Spell} from "../../src/files/dnd";

/* tslint:disable:object-literal-sort-keys */
export default new Factory()
  .attrs({
    level: 0,
    school: "abjuration",
    cast: "1 action",
    ritual: false,
    range: "30 feet",
    verbal: true,
    somatic: true,
    material: "",
    duration: "instantaneous",
  })
  .after((factory) => {
    // Rosie can pass factory attributes to a constructor function, but the
    // constructor must accept an object instead of positional arguments.
    // Pass the factory values to the Spell constructor explicitly.
    return new Spell(
      factory.level,
      factory.school,
      factory.cast,
      factory.ritual,
      factory.range,
      factory.verbal,
      factory.somatic,
      factory.material,
      factory.duration
    );
  });
/* tslint:enable */
