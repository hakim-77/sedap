export default function totalGaji( { totalGaji }) {
    return (
        <div className="mt-4 p-3 bg-blue-100 border-1-4 border-blue-500 text-blue-700">
            <p className="font-semibold">
                <div className="mt-4 p-3 bg-blue-100 border-1-4 border-blue-500 text-blue-700">
                    <p className="font-semibold">
                        Total Take Home Pay (THP): Rp {totalGaji.toLocaleString()}
                        
                    </p>
                </div>
            </p>
        </div>
    )
}