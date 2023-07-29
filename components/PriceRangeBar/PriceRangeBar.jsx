import ReactSlider from "react-slider";
import "./PriceRangeBar.css"
import { useEffect, useState } from "react";

const PriceRangeBar = ({ listFun }) => {
    const [minValue, setMinValue] = useState(1);
    const [maxValue, setMaxValue] = useState(60000);
    const [finaValue, setFinalValue] = useState([minValue, maxValue]);
    async function productfilter(e) {

        listFun(finaValue)

    }

    console.log(`finaValue: ${finaValue}`);
    const minHandle = (e) => {
        setMinValue(e.target.value);
    };
    const maxHandle = (e) => {
        setMaxValue(e.target.value);
    };

    useEffect(() => {
        if (minValue && maxValue) {
            setFinalValue([minValue, maxValue]);
        }
    }, [minValue, maxValue]);

    return (
        <div>
            <span className="d-flex justify-content-between align-items-center ">
                <h6 className="text-uppercase ">PRICE (EGP)</h6>
                <button className="btn price-btn fw-medium " onClick={(e) => { productfilter(e) }}>Apply</button>
            </span>
            <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                defaultValue={[1, 60000]}
                max={60000}
                min={1}
                value={[minValue, maxValue]}
                // ariaLabel={["Lower thumb", "Upper thumb"]}
                // ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                onChange={(value, index) => {
                    // setValue(value);
                    // setFinalValue([value[0], value[1]]);
                    setMinValue(value[0]);
                    setMaxValue(value[1]);
                }}
                pearling
                minDistance={100}
            />

            <div className="input-container d-flex justify-content-between align-items-center">
                <input
                    className="form-control me-2"
                    type="number"
                    placeholder="Min"
                    min="1"
                    max="4990"
                    onBlur={(e) => {
                        if (!e.target.value) {
                            setMinValue(1);
                        }
                    }}
                    onChange={(e) => {
                        minHandle(e);
                    }}
                    value={minValue}
                />

                <input
                    className="form-control"
                    type="number"
                    placeholder="Max"
                    min="101"
                    max="60000"
                    onBlur={(e) => {
                        if (!e.target.value) {
                            setMaxValue(60000);
                        }
                    }}
                    onChange={(e) => {
                        maxHandle(e);
                    }}
                    value={maxValue}
                />
            </div>
        </div>
    );
};

export default PriceRangeBar;
