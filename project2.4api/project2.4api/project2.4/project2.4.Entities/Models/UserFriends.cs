using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace project2._4.Entities.Models
{
    public class UserFriends
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public Guid FriendUserId { get; set; }
    }
}
