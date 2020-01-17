export interface Showcase {
  name: string;
  url: string;
  state: string;
  date: string;
  location: string;
  roster: Player[];
}

export interface Player {
  // Player Info
  id: string;
  url: string;
  name: string;
  main_pos: string;
  side_pos: string;
  state: string;
  school: string;
  class: string;
  commitment: string;
  height: string;
  weight: string;
  arm?: string;

  // Position Stats
  sixtyYard: string | number;
  homeToFirst: string | number;
  infield: string | number;
  outfield: string | number;
  catcher: string | number;
  popTime: string | number;
  exit: string | number;

  // Pitching Stats
  fastBall: string | number;
  maxfBall: string | number;
  curveBall: string | number;
  changeUp: string | number;
  slider: string | number;
  splitter: string | number;
  cutter: string | number;
  knuckle: string | number;
  fork: string | number;

  // curveBallVelo: string | number | undefined;
  // exitVelo: string | number | undefined;
  // setup: string | number | undefined;
  // flexibility: string | number | undefined;
  // armType: string | number | undefined;
  // bodyFrame: string | number | undefined;
  // slotType: string | number | undefined;
  // accuracyType: string | number | undefined;
  // fieldingVars: string | number | undefined;
  // stanceType: string | number | undefined;
  // loadType: string | number | undefined;
  // strideType: string | number | undefined;
  // batSpeedType: string | number | undefined;
  // swingType: string | number | undefined;
  // finishType: string | number | undefined;
  // armAngleType: string | number | undefined;
  // armSpeedType: string | number | undefined;
  // armActionType: string | number | undefined;
  // lateralMovement: string | number | undefined;
  // fieldBall: string | number | undefined;
  // effortType: string | number | undefined;
  // pitchDeliveryType: string | number | undefined;
  // pitchVars: string | number | undefined;
  // profile_url: string | number | undefined;
  // landing: string | number | undefined;
  // pitchFinish: string | number | undefined;
  // approach: string | number | undefined;
  // sixtyComesFirst: boolean | undefined;
  // swingEffort: string | number | undefined;
  // playerOrder: string | number | undefined;
  // balancePoint: string | number | undefined;
  // shoulders: string | number | undefined;
  // barrels: string | number | undefined;
  // loudContact: string | number | undefined;
  // infieldOverall: string | number | undefined;
  // outfieldOverall: string | number | undefined;
  // catcherOverall: string | number | undefined;
  // pitchingOverall: string | number | undefined;
  // hittingOverall: string | number | undefined;
  // usedFields: string | number | undefined;
  // usedVelos: string | number | undefined;
}