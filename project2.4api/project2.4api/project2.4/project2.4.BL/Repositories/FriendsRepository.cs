using project2._4.DAL;
using project2._4.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace project2._4.BL.Repositories
{
    public class FriendsRepository
    {
        private DatabaseContext db;

        public FriendsRepository()
        {
            this.db = new DatabaseContext();
        }

        public List<User> GetUserFriends(Guid UserId)
        {
            List<User> Friends = new List<User>();
            List<UserFriends> UserFriends = db.UserFriends.Where(x => x.UserId.Equals(UserId)).ToList();
            foreach (var userfriend in UserFriends)
            {
                Friends.Add(db.Users.Where(x=>x.Id.Equals(userfriend.FriendUserId)).FirstOrDefault());
            }

            return Friends;
        }

        public void AddUserFriend(Guid UserId, Guid FriendUserId)
        {
            if (db.UserFriends.Where(x => x.UserId.Equals(UserId) && x.FriendUserId.Equals(FriendUserId)).FirstOrDefault() == null)
            {
                db.UserFriends.Add(new UserFriends()
                {
                    Id = Guid.NewGuid(),
                    UserId = UserId,
                    FriendUserId = FriendUserId
                });

                db.SaveChanges();
            }
            
        }

        public void RemoveUserFriend(Guid UserId, Guid FriendUserId)
        {
            UserFriends userFriend = db.UserFriends.Where(x => x.UserId.Equals(UserId) && x.FriendUserId.Equals(FriendUserId)).FirstOrDefault();
            db.UserFriends.Remove(userFriend);
            db.SaveChanges();
        }
    }
}
