using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace IngresosNutreesaPantallasV2.Hubs
{
    public class DepartmentsHub : Hub
    {   
        public async Task SendWorker(string department, string worker)
        {
            await Clients.Group(department).SendAsync("ReceiveWorker", worker);
        }
        
        public async Task AddToGroup(string department) 
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, department);
        }

        public async Task RemoveToGroup(string department)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, department);
        }
    }
}