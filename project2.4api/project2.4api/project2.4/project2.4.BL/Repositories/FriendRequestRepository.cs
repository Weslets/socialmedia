using project2._4.DAL;
using project2._4.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace project2._4.BL.Repositories
{
    public class FriendRequestRepository
    {
        private DatabaseContext db;

        public FriendRequestRepository() {
            this.db = new DatabaseContext();
        }

        public List<User> GetUserFriendRequests(Guid UserId)
        {
            List<User> FriendRequestUsers = new List<User>();
            List<FriendRequest> FriendRequests = db.FriendRequests.Where(x => x.RecieverUserId.Equals(UserId)).ToList();
            foreach (var friendRequests in FriendRequests)
            {
                FriendRequestUsers.Add(db.Users.Where(x => x.Id.Equals(friendRequests.SenderUserId)).FirstOrDefault());
            }

            return FriendRequestUsers;
        }

        public void AddFriendRequest(Guid senderUserId, Guid recieverUserId)
        {
            if (db.FriendRequests.Where(x => x.SenderUserId.Equals(senderUserId) && x.RecieverUserId.Equals(recieverUserId)).FirstOrDefault() == null)
            {
                db.FriendRequests.Add(new FriendRequest()
                {
                    Id = Guid.NewGuid(),
                    SenderUserId = senderUserId,
                    RecieverUserId = recieverUserId
                });

                db.SaveChanges();
            }
        }

        public void RemoveFriendRequest(Guid senderUserId, Guid recieverUserId)
        {
            FriendRequest friendRequest = db.FriendRequests.Where(x => x.SenderUserId.Equals(senderUserId) && x.RecieverUserId.Equals(recieverUserId)).FirstOrDefault();
            db.FriendRequests.Remove(friendRequest);
            db.SaveChanges();
        }
    }
}
