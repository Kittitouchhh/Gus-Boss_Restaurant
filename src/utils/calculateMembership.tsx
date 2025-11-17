export default function CalculateMembership(points: number) {

  let level = 1;
  if (points >= 100 && points < 200) level = 2;
  else if (points >= 200 && points < 300) level = 3;
  else if (points >= 300) level = 4;

  let rank = "Bronze";
  let discount = 0.05;

  if (level === 2) {
    rank = "Silver";
    discount = 0.10;
  } 
  else if (level === 3) {
    rank = "Commander";
    discount = 0.15;
  } 
  else if (level === 4) {
    rank = "Conqueror";
    discount = 0.20;
  }
  
  const basePoints = (level - 1) * 100;
  const nextTarget = level < 4 ? level * 100 : 300; 
  let percent = ((points - basePoints) / 100) * 100;
  if (percent < 0) percent = 0;
  if (percent > 100) percent = 100;

  return { points, level, rank, discount, percent, nextTarget };
}