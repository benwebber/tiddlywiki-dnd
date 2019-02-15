import {AttackType, DamageType, hit, weaponAttack} from "$:/plugins/benwebber/dnd/dnd.js";

export const name = "dnd.attack";

export const params = [
  {name: "name"},
  {name: "type"},
  {name: "bonus"},
  {name: "reach"},
  {name: "range"},
  {name: "target"},
  {name: "damage"},
  {name: "damageType"},
  {name: "extraDamage"},
  {name: "extraDamageType"},
  {name: "condDamage"},
  {name: "condDamageType"},
  {name: "extraCondDamage"},
  {name: "extraCondDamageType"},
  {name: "when"},
  {name: "effect"},
];

// tslint:disable no-shadowed-variable
export function run(
  this: any,
  name: string,
  attackType: string,
  bonus: string,
  reach: string,
  range: string,
  target: string,
  damage: string,
  damageType: string,
  extraDamage: string,
  extraDamageType: string,
  condDamage: string,
  condDamageType: string,
  extraCondDamage: string,
  extraCondDamageType: string,
  when: string,
  effect: string,
): string {
  const attackTypes: {[index: string]: AttackType} = {
    both: AttackType.MeleeOrRanged,
    melee: AttackType.Melee,
    ranged: AttackType.Ranged,
  };
  const damageTypes: {[index: string]: DamageType} = {
    acid: DamageType.Acid,
    bludgeoning: DamageType.Bludgeoning,
    cold: DamageType.Cold,
    fire: DamageType.Fire,
    force: DamageType.Force,
    lightning: DamageType.Lightning,
    necrotic: DamageType.Necrotic,
    piercing: DamageType.Piercing,
    poison: DamageType.Poison,
    psychic: DamageType.Psychic,
    radiant: DamageType.Radiant,
    slashing: DamageType.Slashing,
    thunder: DamageType.Thunder,
  };
  const eAttackType = attackTypes[attackType.toLowerCase()];
  if (eAttackType == null) {
    return "";
  }
  const eDamageType = damageTypes[damageType.toLowerCase()];
  const eExtraDamageType = damageTypes[extraDamageType.toLowerCase()];
  const eCondDamageType = damageTypes[condDamageType.toLowerCase()];
  const eExtraCondDamageType = damageTypes[extraCondDamageType.toLowerCase()];
  const output = [
    `//''${name}.''//`,
    weaponAttack(eAttackType, bonus, reach, range, target),
    hit(
      damage,
      eDamageType,
      extraDamage,
      eExtraDamageType,
      condDamage,
      eCondDamageType,
      extraCondDamage,
      eExtraCondDamageType,
      when,
      effect,
    ),
  ];
  return output.join(" ");
}
