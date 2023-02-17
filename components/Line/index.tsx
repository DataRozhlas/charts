import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

if (typeof Highcharts === "object") {
  Highcharts.setOptions({
    lang: {
      months: [
        "leden",
        "únor",
        "březen",
        "duben",
        "květen",
        "červen",
        "červenec",
        "srpen",
        "září",
        "říjen",
        "listopad",
        "prosinec",
      ],
      shortMonths: [
        "led",
        "úno",
        "bře",
        "dub",
        "kvě",
        "čvn",
        "čvc",
        "srp",
        "zář",
        "říj",
        "lis",
        "pro",
      ],
    },
  });
}

const Line = (props: any) => {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={props.options}
      immutable={true}
    />
  );
};

export { Line };
