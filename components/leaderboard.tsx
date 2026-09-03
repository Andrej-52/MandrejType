import { createClient } from '@/lib/supabase/server'

export default async function Leaderboard() {

  const supabase = await createClient();
  const { data: players, error } = await supabase
    .from('Scores')
    .select('id,wpm, accuracy, user_id, profiles(full_name)')
    .order('wpm', { ascending: false })
    .limit(10)


  if (error) {
    console.error(error)
    return <p>Couldn't load leaderboard.</p>
  }
    
  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-full max-w-xl">
        <p className="text-lg font-bold mb-3 ml-3 text-left text-[#671515]">Leaderboard</p>

        <div className="block w-full overflow-x-auto border bg-[#ffffff9b] border-[#671515] rounded-2xl shadow-2xl">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-4 bg-gray-50 text-[#671515] align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                  RANKING
                </th>
                <th className="px-4 bg-gray-50 text-pink-800 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                  NAME
                </th>
                <th className="px-4 bg-gray-50 text-[#671515] align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                  WPM
                </th>
                <th className="px-4 bg-gray-50 text-[#671515] align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px">
                  ACCURACY
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {players.map((player, index) => (
                <tr key={player.id}>
                  <td className="border-t-0 px-4 align-middle text-xs font-medium text-[#671515] whitespace-nowrap p-4 ">
                    {index + 1}
                  </td>
                  <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left text-pink-800">
                    {(player.profiles as any)?.full_name ?? 'Unknown'}
                  </th>
                  <td className="border-t-0 px-4 align-middle text-xs font-medium text-[#671515] whitespace-nowrap p-4 text-[#671515]">
                    {player.wpm}
                  </td>
                  <td className="border-t-0 px-4 align-middle text-xs font-medium text-[#671515] whitespace-nowrap p-4 ">
                    {player.accuracy}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}