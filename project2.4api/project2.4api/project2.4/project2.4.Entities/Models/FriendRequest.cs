using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace project2._4.Entities.Models
{
    public class FriendRequest
    {
        public Guid Id { get; set; }

        public Guid SenderUserId { get; set; }

        public Guid RecieverUserId { get; set; }
    }
}
