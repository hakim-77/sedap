import { useState } from "react";
import ErrorMassage from "./components/ErrorMassage";
import TotalGaji from "./components/TotalGaji";
import InputGaji from "./components/InputGaji";

export default function HitungGajiForm() {
    const [gaji, setGaji] = useState("");

    const pajak = 0.11;
    const totalGaji = gaji - (gaji * pajak);

    return (
        <div className="flex flex-col items-center justify-center m-5 p-5 bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">Hitung Gaji Bersih</h2>

                <InputGaji
                    label="Gaji Pokok"
                    value={gaji}
                    placeholder="Masukkan jumlah gaji"
                    onChange={(e) => setGaji(e.target.value)}
                />

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                        Pajak: <b className="text-red-500">11%</b>
                    </label>
                </div>

                {!gaji ? (
                    <ErrorMassage pesan="Input gaji" />
                ) : (
                    
                    <TotalGaji totalgaji={totalGaji}/>
                )}
            </div>
        </div>
    );
}
