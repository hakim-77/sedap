export default function InputField( { Label, type, placeholder } ){
    return(
        <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">{Label}</label>
            <input type={type}
            placeholder={placeholder}
            className="w-full p-2 border-gray-300 rounded" />
        </div>
    )
}