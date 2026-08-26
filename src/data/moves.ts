import type { Move, TypeName } from '../domain/pokemon';

export const MOVES: Move[] = [
  // ─── NORMAL ───
  { id: 33, nameEn: 'Tackle', nameEs: 'Placaje', type: 'normal', category: 'physical', power: 40, accuracy: 100, pp: 35, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Un embestida física.' },
  { id: 1, nameEn: 'Pound', nameEs: 'Destructor', type: 'normal', category: 'physical', power: 40, accuracy: 100, pp: 35, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Golpea al rival con las patas o la cola.' },
  { id: 52, nameEn: 'Scratch', nameEs: 'Arañazo', type: 'normal', category: 'physical', power: 40, accuracy: 100, pp: 35, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Daña al rival con garras afiladas.' },
  { id: 29, nameEn: 'Headbutt', nameEs: 'Golpe Cabeza', type: 'normal', category: 'physical', power: 70, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: 30, ailment: 'flinch', description: 'Un cabezazo que puede hacer retroceder.' },
  { id: 37, nameEn: 'Take Down', nameEs: 'Atizabajo', type: 'normal', category: 'physical', power: 90, accuracy: 85, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Carga peligrosa que causa daño de retroceso.' },
  { id: 38, nameEn: 'Double-Edge', nameEs: 'Doble Filo', type: 'normal', category: 'physical', power: 120, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Carga de gran poder con fuerte daño de retroceso.' },
  { id: 130, nameEn: 'Slash', nameEs: 'Corte', type: 'normal', category: 'physical', power: 70, accuracy: 100, pp: 20, priority: 0, critRate: 2, effectChance: null, ailment: null, description: 'Golpe con garras que suele ser crítico.' },
  { id: 155, nameEn: 'Swift', nameEs: 'Astucia', type: 'normal', category: 'special', power: 60, accuracy: null, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Rayos que nunca fallan.' },
  { id: 38, nameEn: 'Body Slam', nameEs: 'Golpe Cuerpo', type: 'normal', category: 'physical', power: 85, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: 30, ailment: 'paralysis', description: 'Un golpe con todo el cuerpo que puede paralizar.' },
  { id: 38, nameEn: 'Return', nameEs: 'Retribución', type: 'normal', category: 'physical', power: 102, accuracy: 100, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Poder basado en la felicidad del Pokemon.' },
  { id: 263, nameEn: 'Facade', nameEs: 'Tajo', type: 'normal', category: 'physical', power: 70, accuracy: 100, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Duplica el poder si el usuario está en mal estado.' },
  { id: 163, nameEn: 'Quick Attack', nameEs: 'Ataque Rápido', type: 'normal', category: 'physical', power: 40, accuracy: 100, pp: 30, priority: 1, critRate: 0, effectChance: null, ailment: null, description: 'Ataque con prioridad que siempre golpea primero.' },
  { id: 263, nameEn: 'Extreme Speed', nameEs: 'Velocidad Extrema', type: 'normal', category: 'physical', power: 80, accuracy: 100, pp: 5, priority: 2, critRate: 0, effectChance: null, ailment: null, description: 'Ataque ultrarrápido con alta prioridad.' },
  { id: 63, nameEn: 'Hyper Beam', nameEs: 'Hiperrayo', type: 'normal', category: 'special', power: 150, accuracy: 90, pp: 5, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Rayo de gran potencia que deja al usuario reposando.' },
  { id: 162, nameEn: 'Strength', nameEs: 'Fuerza', type: 'normal', category: 'physical', power: 80, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Un golpe de fuerza bruta.' },
  { id: 129, nameEn: 'Super Fang', nameEs: 'Colmillo Mega', type: 'normal', category: 'physical', power: null, accuracy: 90, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Reduce el HP del rival a la mitad.' },
  { id: 304, nameEn: 'Endeavor', nameEs: 'Esfuerzo', type: 'normal', category: 'physical', power: null, accuracy: 100, pp: 5, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Iguala el HP si el usuario tiene menos.' },
  { id: 332, nameEn: 'Flail', nameEs: 'Latigo', type: 'normal', category: 'physical', power: null, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Golpea con cola. Más fuerte con menos HP.' },

  // ─── FIRE ───
  { id: 53, nameEn: 'Flamethrower', nameEs: 'Lanzallamas', type: 'fire', category: 'special', power: 90, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: 10, ailment: 'burn', description: 'Rayo de fuego que puede causar quemaduras.' },
  { id: 126, nameEn: 'Fire Blast', nameEs: 'Llamarada', type: 'fire', category: 'special', power: 110, accuracy: 85, pp: 5, priority: 0, critRate: 0, effectChance: 10, ailment: 'burn', description: 'Explosión de fuego de gran potencia.' },
  { id: 482, nameEn: 'Overheat', nameEs: 'Sofocar', type: 'fire', category: 'special', power: 130, accuracy: 90, pp: 5, priority: 0, critRate: 0, effectChance: 100, ailment: null, description: 'Ataque de fuego extremo que baja el Sp.Atk.' },
  { id: 7, nameEn: 'Fire Punch', nameEs: 'Puño Fuego', type: 'fire', category: 'physical', power: 75, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: 10, ailment: 'burn', description: 'Puño encendido que puede quemar.' },
  { id: 421, nameEn: 'Flare Blitz', nameEs: 'Envite Ígneo', type: 'fire', category: 'physical', power: 120, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: 10, ailment: 'burn', description: 'Carga ígnea con daño de retroceso.' },
  { id: 257, nameEn: 'Blaze Kick', nameEs: 'Patada Ígnea', type: 'fire', category: 'physical', power: 85, accuracy: 90, pp: 10, priority: 0, critRate: 1, effectChance: 10, ailment: 'burn', description: 'Patada de fuego con alta probabilidad de crítico.' },
  { id: 481, nameEn: 'Heat Wave', nameEs: 'Onda de Calor', type: 'fire', category: 'special', power: 95, accuracy: 90, pp: 10, priority: 0, critRate: 0, effectChance: 10, ailment: 'burn', description: 'Onda de calor que puede quemar.' },
  { id: 8, nameEn: 'Ember', nameEs: 'Ascuas', type: 'fire', category: 'special', power: 40, accuracy: 100, pp: 25, priority: 0, critRate: 0, effectChance: 10, ailment: 'burn', description: 'Llamas pequeñas que pueden quemar.' },
  { id: 53, nameEn: 'Lava Plume', nameEs: 'Columna de Lava', type: 'fire', category: 'special', power: 80, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: 30, ailment: 'burn', description: 'Erupción de lava que puede quemar.' },
  { id: 53, nameEn: 'Mystical Fire', nameEs: 'Fuego Místico', type: 'fire', category: 'special', power: 75, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: 100, ailment: null, description: 'Llama mística que baja el Sp.Atk.' },

  // ─── WATER ───
  { id: 55, nameEn: 'Hydro Pump', nameEs: 'Hidrochorro', type: 'water', category: 'special', power: 110, accuracy: 80, pp: 5, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Chorro de agua de gran potencia.' },
  { id: 127, nameEn: 'Surf', nameEs: 'Surf', type: 'water', category: 'special', power: 90, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Ola que inunda el campo de batalla.' },
  { id: 135, nameEn: 'Ice Beam', nameEs: 'Rayo Hielo', type: 'water', category: 'special', power: 90, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: 10, ailment: 'freeze', description: 'Rayo de hielo que puede congelar.' },
  { id: 135, nameEn: 'Scald', nameEs: 'Escaldar', type: 'water', category: 'special', power: 80, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: 30, ailment: 'burn', description: 'Agua hirviente que puede quemar.' },
  { id: 127, nameEn: 'Aqua Tail', nameEs: 'Acua Cola', type: 'water', category: 'physical', power: 90, accuracy: 90, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Golpe con la cola cubierto de agua.' },
  { id: 503, nameEn: 'Waterfall', nameEs: 'Cascada', type: 'water', category: 'physical', power: 80, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: 20, ailment: 'flinch', description: 'Carga que puede hacer retroceder.' },
  { id: 127, nameEn: 'Liquidation', nameEs: 'Acuaariada', type: 'water', category: 'physical', power: 85, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: 20, ailment: null, description: 'Golpe líquido que baja la Defensa.' },
  { id: 330, nameEn: 'Flip Turn', nameEs: 'Giro Rapido', type: 'water', category: 'physical', power: 65, accuracy: 100, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Ataque que permite cambiar de Pokemon.' },
  { id: 55, nameEn: 'Aqua Jet', nameEs: 'Acua Jet', type: 'water', category: 'physical', power: 40, accuracy: 100, pp: 20, priority: 1, critRate: 0, effectChance: null, ailment: null, description: 'Ataque acuático con prioridad.' },
  { id: 55, nameEn: 'Brine', nameEs: 'Salmuera', type: 'water', category: 'special', power: 65, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Duplica poder si el rival está a menos del 50% HP.' },

  // ─── ELECTRIC ───
  { id: 85, nameEn: 'Thunderbolt', nameEs: 'Rayo', type: 'electric', category: 'special', power: 90, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: 10, ailment: 'paralysis', description: 'Rayo eléctrico que puede paralizar.' },
  { id: 87, nameEn: 'Thunder', nameEs: 'Trueno', type: 'electric', category: 'special', power: 110, accuracy: 70, pp: 10, priority: 0, critRate: 0, effectChance: 30, ailment: 'paralysis', description: 'Trueno devastador con alta potencia.' },
  { id: 9, nameEn: 'Thunder Punch', nameEs: 'Puño Trueno', type: 'electric', category: 'physical', power: 75, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: 10, ailment: 'paralysis', description: 'Puño eléctrico que puede paralizar.' },
  { id: 521, nameEn: 'Wild Charge', nameEs: 'Voltio Cruel', type: 'electric', category: 'physical', power: 90, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Carga eléctrica con daño de retroceso.' },
  { id: 344, nameEn: 'Volt Switch', nameEs: 'Cambio Voltaico', type: 'electric', category: 'special', power: 70, accuracy: 100, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Ataque que permite cambiar de Pokemon.' },
  { id: 86, nameEn: 'Thunder Wave', nameEs: 'Onda Trueno', type: 'electric', category: 'status', power: null, accuracy: 90, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: 'paralysis', description: 'Paraliza al rival con una onda eléctrica.' },
  { id: 85, nameEn: 'Electroweb', nameEs: 'Electrotela', type: 'electric', category: 'special', power: 55, accuracy: 95, pp: 15, priority: 0, critRate: 0, effectChance: 100, ailment: null, description: 'Red eléctrica que baja la velocidad.' },
  { id: 85, nameEn: 'Shock Wave', nameEs: 'Onda Voltaje', type: 'electric', category: 'special', power: 60, accuracy: null, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Ondas que nunca fallan.' },
  { id: 85, nameEn: 'Nuzzle', nameEs: 'Nuzzle', type: 'electric', category: 'physical', power: 20, accuracy: 100, pp: 20, priority: 0, critRate: 0, effectChance: 100, ailment: 'paralysis', description: 'Golpe tierno que siempre paraliza.' },
  { id: 85, nameEn: 'Eerie Impulse', nameEs: 'Impulso Extraño', type: 'electric', category: 'status', power: null, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Baja enormemente el Sp.Atk.' },

  // ─── GRASS ───
  { id: 75, nameEn: 'Razor Leaf', nameEs: 'Hoja Afilada', type: 'grass', category: 'physical', power: 55, accuracy: 95, pp: 25, priority: 0, critRate: 1, effectChance: null, ailment: null, description: 'Hojas afiladas con alta probabilidad de crítico.' },
  { id: 76, nameEn: 'Solar Beam', nameEs: 'Rayo Solar', type: 'grass', category: 'special', power: 120, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Absorbe luz y luego lanza un rayo devastador.' },
  { id: 71, nameEn: 'Absorb', nameEs: 'Absorber', type: 'grass', category: 'special', power: 20, accuracy: 100, pp: 25, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Drena HP del rival.' },
  { id: 73, nameEn: 'Mega Drain', nameEs: 'Megaagotar', type: 'grass', category: 'special', power: 40, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Drena gran cantidad de HP del rival.' },
  { id: 74, nameEn: 'Giga Drain', nameEs: 'Gigadrenado', type: 'grass', category: 'special', power: 75, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Drena mucho HP del rival.' },
  { id: 402, nameEn: 'Leaf Storm', nameEs: 'Tormenta Floral', type: 'grass', category: 'special', power: 130, accuracy: 90, pp: 5, priority: 0, critRate: 0, effectChance: 100, ailment: null, description: 'Tormenta de hojas que baja el Sp.Atk.' },
  { id: 348, nameEn: 'Leaf Blade', nameEs: 'Hoja Filo', type: 'grass', category: 'physical', power: 90, accuracy: 100, pp: 15, priority: 0, critRate: 2, effectChance: null, ailment: null, description: 'Golpe con hoja afilada, alto crítico.' },
  { id: 413, nameEn: 'Energy Ball', nameEs: 'Energibola', type: 'grass', category: 'special', power: 90, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: 10, ailment: null, description: 'Bola de energía que baja Sp.Def.' },
  { id: 154, nameEn: 'Vine Whip', nameEs: 'Látigo Cepa', type: 'grass', category: 'physical', power: 45, accuracy: 100, pp: 25, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Golpea al rival con lianas.' },
  { id: 235, nameEn: 'Ingrain', nameEs: 'Arraigo', type: 'grass', category: 'status', power: null, accuracy: null, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Enraíza al usuario, restaurando HP.' },
  { id: 79, nameEn: 'Sleep Powder', nameEs: 'Polvo Sueño', type: 'grass', category: 'status', power: null, accuracy: 75, pp: 15, priority: 0, critRate: 0, effectChance: null, ailment: 'sleep', description: 'Polvo que duerme al rival.' },
  { id: 20, nameEn: 'Stun Spore', nameEs: 'Parálisis', type: 'grass', category: 'status', power: null, accuracy: 75, pp: 30, priority: 0, critRate: 0, effectChance: null, ailment: 'paralysis', description: 'Polvo que paraliza al rival.' },
  { id: 77, nameEn: 'Leech Seed', nameEs: 'Drenadoras', type: 'grass', category: 'status', power: null, accuracy: 90, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Plantas que drenan HP cada turno.' },
  { id: 331, nameEn: 'Wood Hammer', nameEs: 'Mazazo', type: 'grass', category: 'physical', power: 120, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Mazazo de madera con daño de retroceso.' },
  { id: 136, nameEn: 'Bullet Seed', nameEs: 'Semilla Bala', type: 'grass', category: 'physical', power: 25, accuracy: 100, pp: 30, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Dispara 2-5 semillas de forma rápida.' },

  // ─── ICE ───
  { id: 58, nameEn: 'Ice Beam', nameEs: 'Rayo Hielo', type: 'ice', category: 'special', power: 90, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: 10, ailment: 'freeze', description: 'Rayo de hielo que puede congelar.' },
  { id: 59, nameEn: 'Blizzard', nameEs: 'Ventisca', type: 'ice', category: 'special', power: 110, accuracy: 70, pp: 5, priority: 0, critRate: 0, effectChance: 10, ailment: 'freeze', description: 'Tormenta de nieve devastadora.' },
  { id: 8, nameEn: 'Ice Punch', nameEs: 'Puño Hielo', type: 'ice', category: 'physical', power: 75, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: 10, ailment: 'freeze', description: 'Puño congelado que puede congelar.' },
  { id: 157, nameEn: 'Icicle Spear', nameEs: 'Carámbano', type: 'ice', category: 'physical', power: 25, accuracy: 100, pp: 30, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Dispara 2-5 carámbanos afilados.' },
  { id: 420, nameEn: 'Icicle Crash', nameEs: 'Avalancha', type: 'ice', category: 'physical', power: 85, accuracy: 90, pp: 10, priority: 0, critRate: 0, effectChance: 30, ailment: 'flinch', description: 'Lanza carámbanos que pueden hacer retroceder.' },
  { id: 573, nameEn: 'Freeze-Dry', nameEs: 'Liofilizar', type: 'ice', category: 'special', power: 70, accuracy: 100, pp: 20, priority: 0, critRate: 0, effectChance: 10, ailment: 'freeze', description: 'Seca y congela. Súper eficaz contra Agua.' },
  { id: 58, nameEn: 'Frost Breath', nameEs: 'Aliento Gélido', type: 'ice', category: 'special', power: 60, accuracy: 90, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Siempre da crítico.' },

  // ─── FIGHTING ───
  { id: 410, nameEn: 'Close Combat', nameEs: 'Combate', type: 'fighting', category: 'physical', power: 120, accuracy: 100, pp: 5, priority: 0, critRate: 0, effectChance: 100, ailment: null, description: 'Pelea cuerpo a cuerpo que baja Def y Sp.Def.' },
  { id: 136, nameEn: 'High Jump Kick', nameEs: 'Patada Salto Alta', type: 'fighting', category: 'physical', power: 130, accuracy: 90, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Patada que causa daño si falla.' },
  { id: 410, nameEn: 'Drain Punch', nameEs: 'Puño Drenaje', type: 'fighting', category: 'physical', power: 75, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Drena HP del rival con el golpe.' },
  { id: 264, nameEn: 'Mach Punch', nameEs: 'Ultrapuño', type: 'fighting', category: 'physical', power: 40, accuracy: 100, pp: 30, priority: 1, critRate: 0, effectChance: null, ailment: null, description: 'Puño ultrarrápido con prioridad.' },
  { id: 410, nameEn: 'Focus Blast', nameEs: 'Onda Certera', type: 'fighting', category: 'special', power: 120, accuracy: 70, pp: 5, priority: 0, critRate: 0, effectChance: 10, ailment: null, description: 'Bola de energía que baja Sp.Def.' },
  { id: 410, nameEn: 'Aura Sphere', nameEs: 'Esfera Aural', type: 'fighting', category: 'special', power: 80, accuracy: null, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Esfera que nunca falla.' },
  { id: 264, nameEn: 'Bullet Punch', nameEs: 'Puño Bala', type: 'fighting', category: 'physical', power: 40, accuracy: 100, pp: 30, priority: 1, critRate: 0, effectChance: null, ailment: null, description: 'Puño con prioridad de acero.' },
  { id: 67, nameEn: 'Low Kick', nameEs: 'Patada Baja', type: 'fighting', category: 'physical', power: null, accuracy: 100, pp: 20, priority: 0, critRate: 0, effectChance: 30, ailment: 'flinch', description: 'Patada que causda más daño a pesados.' },
  { id: 270, nameEn: 'Force Palm', nameEs: 'Palma Fresca', type: 'fighting', category: 'physical', power: 60, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: 30, ailment: 'paralysis', description: 'Golpe que puede paralizar.' },
  { id: 170, nameEn: 'Submission', nameEs: 'Sumisión', type: 'fighting', category: 'physical', power: 80, accuracy: 80, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Lucha cuerpo a cuerpo con daño de retroceso.' },

  // ─── POISON ───
  { id: 92, nameEn: 'Toxic', nameEs: 'Tóxico', type: 'poison', category: 'status', power: null, accuracy: 90, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: 'badly poisoned', description: 'Veneno severo que incrementa cada turno.' },
  { id: 398, nameEn: 'Poison Jab', nameEs: 'Jabón Veneno', type: 'poison', category: 'physical', power: 80, accuracy: 100, pp: 20, priority: 0, critRate: 0, effectChance: 30, ailment: 'poison', description: 'Golpe venenoso que puede envenenar.' },
  { id: 398, nameEn: 'Sludge Bomb', nameEs: 'Bomba Lodo', type: 'poison', category: 'special', power: 90, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: 30, ailment: 'poison', description: 'Bomba de lodo venenoso.' },
  { id: 398, nameEn: 'Gunk Shot', nameEs: 'Lanzamugre', type: 'poison', category: 'physical', power: 120, accuracy: 80, pp: 5, priority: 0, critRate: 0, effectChance: 30, ailment: 'poison', description: 'Lanza desechos tóxicos.' },
  { id: 398, nameEn: 'Venoshock', nameEs: 'Venococho', type: 'poison', category: 'special', power: 65, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Duplica poder si el rival está envenenado.' },
  { id: 398, nameEn: 'Cross Poison', nameEs: 'Veneno Cruzado', type: 'poison', category: 'physical', power: 70, accuracy: 100, pp: 20, priority: 0, critRate: 1, effectChance: 10, ailment: 'poison', description: 'Veneno cruzado con alto crítico.' },
  { id: 398, nameEn: 'Smog', nameEs: 'Tóxico', type: 'poison', category: 'special', power: 30, accuracy: 70, pp: 20, priority: 0, critRate: 0, effectChance: 40, ailment: 'poison', description: 'Gas venenoso que puede envenenar.' },
  { id: 398, nameEn: 'Acid', nameEs: 'Ácido', type: 'poison', category: 'special', power: 40, accuracy: 100, pp: 30, priority: 0, critRate: 0, effectChance: 10, ailment: null, description: 'Ácido que puede bajar la Defensa.' },

  // ─── GROUND ───
  { id: 89, nameEn: 'Earthquake', nameEs: 'Terremoto', type: 'ground', category: 'physical', power: 100, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Sacro telúrico de gran potencia.' },
  { id: 89, nameEn: 'Earth Power', nameEs: 'Poder Terral', type: 'ground', category: 'special', power: 90, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: 10, ailment: null, description: 'Poder de la tierra que puede bajar Sp.Def.' },
  { id: 153, nameEn: 'Dig', nameEs: 'Excavar', type: 'ground', category: 'physical', power: 80, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Excava y golpea al subir.' },
  { id: 89, nameEn: 'Bulldoze', nameEs: 'Apisonadora', type: 'ground', category: 'physical', power: 60, accuracy: 100, pp: 20, priority: 0, critRate: 0, effectChance: 100, ailment: null, description: 'Terremoto que baja la velocidad.' },
  { id: 153, nameEn: 'Mud-Slap', nameEs: 'Bofetada Lodo', type: 'ground', category: 'special', power: 20, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: 100, ailment: null, description: 'Lodo que baja la precisión.' },
  { id: 330, nameEn: 'Mud Shot', nameEs: 'Disparo Lodo', type: 'ground', category: 'special', power: 55, accuracy: 95, pp: 15, priority: 0, critRate: 0, effectChance: 100, ailment: null, description: 'Disparo de lodo que baja velocidad.' },
  { id: 89, nameEn: 'High Horsepower', nameEs: 'Gran Potencia', type: 'ground', category: 'physical', power: 95, accuracy: 95, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Golpe de fuerza bruta.' },
  { id: 89, nameEn: 'Stomping Tantrum', nameEs: 'Pataleta', type: 'ground', category: 'physical', power: 75, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Pisotón furioso que dobla poder si falló.' },

  // ─── FLYING ───
  { id: 157, nameEn: 'Fly', nameEs: 'Vuelo', type: 'flying', category: 'physical', power: 90, accuracy: 95, pp: 15, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Vuela y golpea al descender.' },
  { id: 17, nameEn: 'Gust', nameEs: 'Tornado', type: 'flying', category: 'special', power: 40, accuracy: 100, pp: 35, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Crea un tornado que golpea al rival.' },
  { id: 157, nameEn: 'Wing Attack', nameEs: 'Tajo Alado', type: 'flying', category: 'physical', power: 60, accuracy: 100, pp: 35, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Golpea con las alas extendidas.' },
  { id: 413, nameEn: 'Air Slash', nameEs: 'Tajo Aéreo', type: 'flying', category: 'special', power: 75, accuracy: 95, pp: 15, priority: 0, critRate: 0, effectChance: 30, ailment: 'flinch', description: 'Tajo aéreo que puede hacer retroceder.' },
  { id: 413, nameEn: 'Brave Bird', nameEs: 'Pájaro Osado', type: 'flying', category: 'physical', power: 120, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Vuelo suicida con daño de retroceso.' },
  { id: 413, nameEn: 'Hurricane', nameEs: 'Huracán', type: 'flying', category: 'special', power: 110, accuracy: 70, pp: 10, priority: 0, critRate: 0, effectChance: 30, ailment: 'confusion', description: 'Huracán que puede confundir.' },
  { id: 157, nameEn: 'Acrobatics', nameEs: 'Acrobacia', type: 'flying', category: 'physical', power: 55, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Duplica poder sin objeto equipado.' },
  { id: 17, nameEn: 'Defog', nameEs: 'Despejar', type: 'flying', category: 'status', power: null, accuracy: null, pp: 15, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Despeja obstáculos y baja evasión.' },
  { id: 332, nameEn: 'U-turn', nameEs: 'Ida y Vuelta', type: 'flying', category: 'physical', power: 70, accuracy: 100, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Ataque que permite cambiar de Pokemon.' },
  { id: 332, nameEn: 'Roost', nameEs: 'Descanso', type: 'flying', category: 'status', power: null, accuracy: null, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Restaura hasta el 50% del HP máximo.' },

  // ─── PSYCHIC ───
  { id: 94, nameEn: 'Psychic', nameEs: 'Psíquico', type: 'psychic', category: 'special', power: 90, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: 10, ailment: null, description: 'Ataque psíquico que puede bajar Sp.Def.' },
  { id: 94, nameEn: 'Psyshock', nameEs: 'Onda Psíquica', type: 'psychic', category: 'special', power: 80, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Golpe psíquico que usa la Defensa.' },
  { id: 94, nameEn: 'Zen Headbutt', nameEs: 'Cabeza Zen', type: 'psychic', category: 'physical', power: 80, accuracy: 90, pp: 15, priority: 0, critRate: 0, effectChance: 20, ailment: 'flinch', description: 'Cabezazo telepático.' },
  { id: 94, nameEn: 'Psybeam', nameEs: 'Psicorrayo', type: 'psychic', category: 'special', power: 65, accuracy: 100, pp: 20, priority: 0, critRate: 0, effectChance: 10, ailment: 'confusion', description: 'Rayo que puede confundir.' },
  { id: 94, nameEn: 'Shadow Ball', nameEs: 'Bola Sombra', type: 'ghost', category: 'special', power: 80, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: 20, ailment: null, description: 'Bola de sombras que puede bajar Sp.Def.' },
  { id: 94, nameEn: 'Future Sight', nameEs: 'Premonición', type: 'psychic', category: 'special', power: 120, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Ataque que golpea 2 turnos después.' },
  { id: 94, nameEn: 'Stored Power', nameEs: 'Poder Reservado', type: 'psychic', category: 'special', power: 20, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Más poder por cada stage de stat提升.' },
  { id: 94, nameEn: 'Calm Mind', nameEs: 'Paz Mental', type: 'psychic', category: 'status', power: null, accuracy: null, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Sube Sp.Atk y Sp.Def.' },
  { id: 94, nameEn: 'Trick', nameEs: 'Truco', type: 'psychic', category: 'status', power: null, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Intercambia objetos.' },
  { id: 94, nameEn: 'Light Screen', nameEs: 'Pantalla Luz', type: 'psychic', category: 'status', power: null, accuracy: null, pp: 30, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Reduce daño especial por la mitad.' },
  { id: 94, nameEn: 'Reflect', nameEs: 'Reflejo', type: 'psychic', category: 'status', power: null, accuracy: null, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Reduce daño físico por la mitad.' },
  { id: 94, nameEn: 'Hypnosis', nameEs: 'Hipnosis', type: 'psychic', category: 'status', power: null, accuracy: 60, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: 'sleep', description: 'Duerme al rival con sugestión.' },
  { id: 94, nameEn: 'Rest', nameEs: 'Descanso', type: 'psychic', category: 'status', power: null, accuracy: null, pp: 5, priority: 0, critRate: 0, effectChance: null, ailment: 'sleep', description: 'Restaura todo el HP pero duerme 2 turnos.' },

  // ─── BUG ───
  { id: 405, nameEn: 'Bug Buzz', nameEs: 'Zumbido', type: 'bug', category: 'special', power: 90, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: 10, ailment: null, description: 'Zumbido que puede bajar Sp.Def.' },
  { id: 332, nameEn: 'U-turn', nameEs: 'Ida y Vuelta', type: 'bug', category: 'physical', power: 70, accuracy: 100, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Ataque que permite cambiar de Pokemon.' },
  { id: 141, nameEn: 'Leech Life', nameEs: 'Absorbe Vida', type: 'bug', category: 'physical', power: 80, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Drena HP del rival.' },
  { id: 141, nameEn: 'Megahorn', nameEs: 'Cornamenta', type: 'bug', category: 'physical', power: 120, accuracy: 85, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Golpe con cuerno de gran poder.' },
  { id: 141, nameEn: 'X-Scissor', nameEs: 'Tijera X', type: 'bug', category: 'physical', power: 80, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Tijera de bug afilada.' },
  { id: 141, nameEn: 'Silver Wind', nameEs: 'Viento Plateado', type: 'bug', category: 'special', power: 60, accuracy: 100, pp: 5, priority: 0, critRate: 0, effectChance: 10, ailment: null, description: 'Viento que puede subir todos los stats.' },
  { id: 141, nameEn: 'Quiver Dance', nameEs: 'Danza Pennada', type: 'bug', category: 'status', power: null, accuracy: null, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Sube Sp.Atk, Sp.Def y Speed.' },
  { id: 141, nameEn: 'Sticky Web', nameEs: 'Red Pegajosa', type: 'bug', category: 'status', power: null, accuracy: null, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Tejido que baja la velocidad al entrar.' },
  { id: 141, nameEn: 'Bullet Seed', nameEs: 'Semilla Bala', type: 'bug', category: 'physical', power: 25, accuracy: 100, pp: 30, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Dispara 2-5 semillas de forma rápida.' },
  { id: 141, nameEn: 'First Impression', nameEs: 'Buena Impresión', type: 'bug', category: 'physical', power: 90, accuracy: 100, pp: 10, priority: 2, critRate: 0, effectChance: null, ailment: null, description: 'Solo funciona en el primer turno.' },

  // ─── ROCK ───
  { id: 89, nameEn: 'Stone Edge', nameEs: 'Roca Afilada', type: 'rock', category: 'physical', power: 100, accuracy: 80, pp: 5, priority: 0, critRate: 2, effectChance: null, ailment: null, description: 'Roca afilada con alto crítico.' },
  { id: 89, nameEn: 'Rock Slide', nameEs: 'Avalancha', type: 'rock', category: 'physical', power: 75, accuracy: 90, pp: 10, priority: 0, critRate: 0, effectChance: 30, ailment: 'flinch', description: 'Desata una avalancha.' },
  { id: 89, nameEn: 'Rock Tomb', nameEs: 'Tumba Roque', type: 'rock', category: 'physical', power: 60, accuracy: 95, pp: 15, priority: 0, critRate: 0, effectChance: 100, ailment: null, description: 'Lanza rocas que bajan velocidad.' },
  { id: 89, nameEn: 'Rock Blast', nameEs: 'Acometida', type: 'rock', category: 'physical', power: 25, accuracy: 90, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Dispara 2-5 rocas.' },
  { id: 89, nameEn: 'Power Gem', nameEs: 'Gema Trueno', type: 'rock', category: 'special', power: 80, accuracy: 100, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Rayo de energía de gema.' },
  { id: 89, nameEn: 'Ancient Power', nameEs: 'Poder Antiguo', type: 'rock', category: 'special', power: 60, accuracy: 100, pp: 5, priority: 0, critRate: 0, effectChance: 10, ailment: null, description: 'Poder ancestral que puede subir todos los stats.' },
  { id: 89, nameEn: 'Smack Down', nameEs: 'Demoler', type: 'rock', category: 'physical', power: 50, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Derriba al rival volador.' },
  { id: 89, nameEn: 'Head Smash', nameEs: 'Testarazo', type: 'rock', category: 'physical', power: 150, accuracy: 80, pp: 5, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Cabezazo devastador con daño de retroceso.' },

  // ─── GHOST ───
  { id: 95, nameEn: 'Shadow Ball', nameEs: 'Bola Sombra', type: 'ghost', category: 'special', power: 80, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: 20, ailment: null, description: 'Bola de sombras que puede bajar Sp.Def.' },
  { id: 95, nameEn: 'Shadow Claw', nameEs: 'Garra Umbría', type: 'ghost', category: 'physical', power: 70, accuracy: 100, pp: 15, priority: 0, critRate: 2, effectChance: null, ailment: null, description: 'Garra sombría con alto crítico.' },
  { id: 95, nameEn: 'Poltergeist', nameEs: 'Poltergeist', type: 'ghost', category: 'physical', power: 110, accuracy: 90, pp: 5, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Ataque fantasma con objeto del rival.' },
  { id: 95, nameEn: 'Shadow Sneak', nameEs: 'Sombra Vil', type: 'ghost', category: 'physical', power: 40, accuracy: 100, pp: 30, priority: 1, critRate: 0, effectChance: null, ailment: null, description: 'Ataque con sombra con prioridad.' },
  { id: 95, nameEn: 'Phantom Force', nameEs: 'Golpe Fantasma', type: 'ghost', category: 'physical', power: 90, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Desaparece y golpea al siguiente turno.' },
  { id: 95, nameEn: 'Hex', nameEs: 'Maldición', type: 'ghost', category: 'special', power: 65, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Duplica poder si el rival tiene estado.' },
  { id: 95, nameEn: 'Will-O-Wisp', nameEs: 'Fuego Fatuo', type: 'ghost', category: 'status', power: null, accuracy: 85, pp: 15, priority: 0, critRate: 0, effectChance: null, ailment: 'burn', description: 'Llama que quema al rival.' },
  { id: 95, nameEn: 'Curse', nameEs: 'Maldición', type: 'ghost', category: 'status', power: null, accuracy: null, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Maldición que baja Speed y sube Atk/Def.' },
  { id: 95, nameEn: 'Night Shade', nameEs: 'Terror Nocturno', type: 'ghost', category: 'special', power: null, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Causa daño fijo igual al nivel.' },

  // ─── DRAGON ───
  { id: 82, nameEn: 'Dragon Rage', nameEs: 'Furia Dragón', type: 'dragon', category: 'special', power: null, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Siempre causa 40 de daño.' },
  { id: 82, nameEn: 'Dragon Claw', nameEs: 'Garra Dragón', type: 'dragon', category: 'physical', power: 80, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Garra afilada de dragón.' },
  { id: 82, nameEn: 'Outrage', nameEs: 'Enfado', type: 'dragon', category: 'physical', power: 120, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Ataque furioso de 2-3 turnos.' },
  { id: 82, nameEn: 'Draco Meteor', nameEs: 'Meteo Drago', type: 'dragon', category: 'special', power: 130, accuracy: 90, pp: 5, priority: 0, critRate: 0, effectChance: 100, ailment: null, description: 'Meteoro que baja el Sp.Atk.' },
  { id: 82, nameEn: 'Dragon Pulse', nameEs: 'Pulso Dragón', type: 'dragon', category: 'special', power: 85, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Onda de choque de dragón.' },
  { id: 82, nameEn: 'Dragon Dance', nameEs: 'Danza Dragón', type: 'dragon', category: 'status', power: null, accuracy: null, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Sube Attack y Speed.' },
  { id: 82, nameEn: 'Scale Shot', nameEs: 'Disparo Escama', type: 'dragon', category: 'physical', power: 25, accuracy: 90, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Dispara escamas 2-5 veces, sube Speed y baja Def.' },
  { id: 82, nameEn: 'Breaking Swipe', nameEs: 'Tajo Plano', type: 'dragon', category: 'physical', power: 60, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: 100, ailment: null, description: 'Golpea a todos, baja Attack.' },

  // ─── DARK ───
  { id: 398, nameEn: 'Knock Off', nameEs: 'Negazo', type: 'dark', category: 'physical', power: 65, accuracy: 100, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Elimina el objeto del rival.' },
  { id: 398, nameEn: 'Dark Pulse', nameEs: 'Pulso Oscuro', type: 'dark', category: 'special', power: 80, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: 20, ailment: 'flinch', description: 'Pulso de energía oscura.' },
  { id: 398, nameEn: 'Sucker Punch', nameEs: 'Golpe Bajo', type: 'dark', category: 'physical', power: 70, accuracy: 100, pp: 5, priority: 1, critRate: 0, effectChance: null, ailment: null, description: 'Golpe con prioridad que solo funciona si el rival ataca.' },
  { id: 398, nameEn: 'Crunch', nameEs: 'Mordisco', type: 'dark', category: 'physical', power: 80, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: 20, ailment: null, description: 'Mordisco que puede bajar Defensa.' },
  { id: 398, nameEn: 'Pursuit', nameEs: 'Persecución', type: 'dark', category: 'physical', power: 40, accuracy: 100, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Duplica poder si el rival cambia.' },
  { id: 398, nameEn: 'Throat Chop', nameEs: 'Corte Garganta', type: 'dark', category: 'physical', power: 65, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: 100, ailment: null, description: 'Impide usar sonido por 2 turnos.' },
  { id: 398, nameEn: 'Foul Play', nameEs: 'Juego Sucio', type: 'dark', category: 'physical', power: 95, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Usa el Attack del rival para calcular.' },
  { id: 398, nameEn: 'Parting Shot', nameEs: 'Última Palabra', type: 'dark', category: 'status', power: null, accuracy: 100, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Baja Atk y Sp.Atk, luego cambia.' },
  { id: 398, nameEn: 'Nasty Plot', nameEs: 'Maquinación', type: 'dark', category: 'status', power: null, accuracy: null, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Dobla el Sp.Atk.' },
  { id: 398, nameEn: 'Taunt', nameEs: 'Mofa', type: 'dark', category: 'status', power: null, accuracy: 100, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Impide usar movimientos de estado.' },
  { id: 398, nameEn: 'Swords Dance', nameEs: 'Danza Espada', type: 'dark', category: 'status', power: null, accuracy: null, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Dobla el Attack.' },
  { id: 398, nameEn: 'Lash Out', nameEs: 'Reprimir', type: 'dark', category: 'physical', power: 75, accuracy: 100, pp: 5, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Duplica poder si los stats bajaron.' },
  { id: 398, nameEn: 'Beat Up', nameEs: 'Paliza', type: 'dark', category: 'physical', power: null, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Golpea una vez por Pokemon del equipo.' },
  { id: 398, nameEn: 'Assurance', nameEs: 'Seguro', type: 'dark', category: 'physical', power: 60, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Duplica poder si el rival ya fue dañado.' },

  // ─── STEEL ───
  { id: 232, nameEn: 'Iron Head', nameEs: 'Cabezahierro', type: 'steel', category: 'physical', power: 80, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: 30, ailment: 'flinch', description: 'Cabezazo de acero que puede hacer retroceder.' },
  { id: 232, nameEn: 'Flash Cannon', nameEs: 'Cañón Luminoso', type: 'steel', category: 'special', power: 80, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: 10, ailment: null, description: 'Rayo de acero que puede bajar Sp.Def.' },
  { id: 232, nameEn: 'Meteor Mash', nameEs: 'Puño Meteoro', type: 'steel', category: 'physical', power: 90, accuracy: 90, pp: 10, priority: 0, critRate: 0, effectChance: 20, ailment: null, description: 'Puño meteoro que puede subir Attack.' },
  { id: 232, nameEn: 'Bullet Punch', nameEs: 'Puño Bala', type: 'steel', category: 'physical', power: 40, accuracy: 100, pp: 30, priority: 1, critRate: 0, effectChance: null, ailment: null, description: 'Puño rápido de acero con prioridad.' },
  { id: 232, nameEn: 'Iron Tail', nameEs: 'Cola Hierro', type: 'steel', category: 'physical', power: 100, accuracy: 75, pp: 15, priority: 0, critRate: 0, effectChance: 30, ailment: null, description: 'Cola de acero que puede bajar Defensa.' },
  { id: 232, nameEn: 'Gyro Ball', nameEs: 'Giro Bola', type: 'steel', category: 'physical', power: null, accuracy: 100, pp: 5, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Más poder contra rivales rápidos.' },
  { id: 232, nameEn: 'Heavy Slam', nameEs: 'Cuerpo Pesado', type: 'steel', category: 'physical', power: null, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Más poder si el usuario es más pesado.' },
  { id: 232, nameEn: 'Steel Beam', nameEs: 'Viga Acero', type: 'steel', category: 'special', power: 140, accuracy: 95, pp: 5, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Rayo de acero con daño de retroceso.' },
  { id: 232, nameEn: 'Autotomize', nameEs: 'Auto夺得', type: 'steel', category: 'status', power: null, accuracy: null, pp: 15, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Suelta peso, sube mucha velocidad.' },

  // ─── FAIRY ───
  { id: 585, nameEn: 'Moonblast', nameEs: 'Caramelo Lua', type: 'fairy', category: 'special', power: 95, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: 30, ailment: null, description: 'Energía lunar que puede bajar Sp.Atk.' },
  { id: 585, nameEn: 'Play Rough', nameEs: 'Gamuzazo', type: 'fairy', category: 'physical', power: 90, accuracy: 90, pp: 10, priority: 0, critRate: 0, effectChance: 10, ailment: null, description: 'Juego brusco que puede bajar Attack.' },
  { id: 585, nameEn: 'Dazzling Gleam', nameEs: 'Brillo Diamante', type: 'fairy', category: 'special', power: 80, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Brillo ofuscante.' },
  { id: 585, nameEn: 'Draining Kiss', nameEs: 'Beso Drenaje', type: 'fairy', category: 'special', power: 50, accuracy: 100, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Drena HP del rival con un beso.' },
  { id: 585, nameEn: 'Fairy Wind', nameEs: 'Viento Hada', type: 'fairy', category: 'special', power: 40, accuracy: 100, pp: 30, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Viento hada que golpea al rival.' },
  { id: 585, nameEn: 'Spirit Break', nameEs: 'Ruptura Anima', type: 'fairy', category: 'physical', power: 75, accuracy: 100, pp: 15, priority: 0, critRate: 0, effectChance: 100, ailment: null, description: 'Golpe que baja el Sp.Atk.' },
  { id: 585, nameEn: 'Misty Terrain', nameEs: 'Campo Niebla', type: 'fairy', category: 'status', power: null, accuracy: null, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Protege contra estados por 5 turnos.' },
  { id: 585, nameEn: 'Charm', nameEs: 'Encanto', type: 'fairy', category: 'status', power: null, accuracy: 100, pp: 20, priority: 0, critRate: 0, effectChance: null, ailment: null, description: 'Baja mucho el Attack.' },
  { id: 585, nameEn: 'Baby-Doll Eyes', nameEs: 'Ojitos Tiernos', type: 'fairy', category: 'status', power: null, accuracy: 100, pp: 30, priority: 1, critRate: 0, effectChance: null, ailment: null, description: 'Prioridad que baja el Attack.' },
  { id: 585, nameEn: 'Sweet Kiss', nameEs: 'Beso Dulce', type: 'fairy', category: 'status', power: null, accuracy: 75, pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: 'confusion', description: 'Beso que confunde al rival.' }
];

export function getMoveByName(name: string): Move | undefined {
  const lower = name.toLowerCase();
  return MOVES.find(m => m.nameEn.toLowerCase() === lower || m.nameEs.toLowerCase() === lower);
}

export function getMovesByType(type: TypeName): Move[] {
  return MOVES.filter(m => m.type === type && m.category !== 'status');
}

export function getDamagingMoves(): Move[] {
  return MOVES.filter(m => m.category !== 'status');
}
