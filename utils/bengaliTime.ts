import { DateTime } from "luxon";

const BENGALI_MONTHS = [
  "বৈশাখ",
  "জ্যৈষ্ঠ",
  "আষাঢ়",
  "শ্রাবণ",
  "ভাদ্র",
  "আশ্বিন",
  "কার্তিক",
  "অগ্রহায়ণ",
  "পৌষ",
  "মাঘ",
  "ফাল্গুন",
  "চৈত্র",
];

const BENGALI_MONTH_STARTS: { month: number; day: number }[] = [
  { month: 4, day: 14 }, // বৈশাখ
  { month: 5, day: 15 }, // জ্যৈষ্ঠ
  { month: 6, day: 15 }, // আষাঢ়
  { month: 7, day: 16 }, // শ্রাবণ
  { month: 8, day: 16 }, // ভাদ্র
  { month: 9, day: 16 }, // আশ্বিন
  { month: 10, day: 17 }, // কার্তিক
  { month: 11, day: 16 }, // অগ্রহায়ণ
  { month: 12, day: 16 }, // পৌষ
  { month: 1, day: 16 }, // মাঘ
  { month: 2, day: 14 }, // ফাল্গুন
  { month: 3, day: 15 }, // চৈত্র
];

function toBanglaDate(dt: DateTime) {
  const pohela = DateTime.fromObject(
    { year: dt.year, month: 4, day: 14 },
    { zone: dt.zone },
  );
  const bnYearNum = dt < pohela ? dt.year - 594 : dt.year - 593;

  let idx = BENGALI_MONTH_STARTS.findIndex((st, i) => {
    const start = DateTime.fromObject(
      {
        year: st.month < 4 ? dt.year + 1 : dt.year,
        month: st.month,
        day: st.day,
      },
      { zone: dt.zone },
    );
    const nextStart = BENGALI_MONTH_STARTS[i + 1]
      ? DateTime.fromObject(
          {
            year: BENGALI_MONTH_STARTS[i + 1].month < 4 ? dt.year + 1 : dt.year,
            month: BENGALI_MONTH_STARTS[i + 1].month,
            day: BENGALI_MONTH_STARTS[i + 1].day,
          },
          { zone: dt.zone },
        )
      : start.plus({ months: 1 });
    return dt >= start && dt < nextStart;
  });
  if (idx === -1) idx = BENGALI_MONTH_STARTS.length - 1;

  const startOfBnMonth = DateTime.fromObject(
    {
      year: BENGALI_MONTH_STARTS[idx].month < 4 ? dt.year + 1 : dt.year,
      month: BENGALI_MONTH_STARTS[idx].month,
      day: BENGALI_MONTH_STARTS[idx].day,
    },
    { zone: dt.zone },
  );
  const bnDayNum = Math.floor(dt.diff(startOfBnMonth, "days").days) + 1;

  return {
    day: bnDayNum.toLocaleString("bn", { useGrouping: false }),
    month: BENGALI_MONTHS[idx],
    year: bnYearNum.toLocaleString("bn", { useGrouping: false }),
  };
}

export function formatBanglaAndHijri() {
  const zone = "Asia/Dhaka";
  const now = DateTime.now().setZone(zone);

  const gregBn = now.setLocale("bn").toLocaleString({
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const bangla = toBanglaDate(now);
  const banglaStr = `${bangla.day} ${bangla.month} ${bangla.year.replace(
    /(\d)\s*,\s*(\d)/g,
    "$1$2",
  )}`;

  let hijriBn = now
    .setLocale("bn")
    .reconfigure({ outputCalendar: "islamic-umalqura" })
    .toLocaleString({
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  hijriBn = hijriBn.replace(/\s*যুগ$/, "");

  // assemble
  return `${banglaStr}, ${hijriBn}`;
}
// console.log(formatBanglaAndHijri());
