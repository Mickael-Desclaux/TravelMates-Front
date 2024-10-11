export default function ProgressBar() {
    return (
        <div>
            <div className="bg-gray-200 h-2 rounded-full">
              <div
                className="bg-green h-2 rounded-full"
                style={{ width: `${33}%` }}
              />
            </div>
          </div>
    )
}    