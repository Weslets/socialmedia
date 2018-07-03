using project2._4.BL.Repositories;
using project2._4.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace project2._4.API.Controllers
{
    public class FriendRequestController : ApiController
    {
        [HttpGet]
        [Authorize]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult GetFriendRequests()
        {
            UserRepository userRep = new UserRepository();
            FriendRequestRepository friendReqRep = new FriendRequestRepository();
            User user = userRep.GetUserByEmail(User.Identity.Name);

            return Ok(friendReqRep.GetUserFriendRequests(user.Id));
        }

        [HttpPost]
        [Authorize]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult AddFriendRequest(Guid FriendUserId)
        {
            UserRepository db = new UserRepository();
            FriendRequestRepository friendRep = new FriendRequestRepository();
            User user = db.GetUserByEmail(User.Identity.Name);

            friendRep.AddFriendRequest(user.Id, FriendUserId);

            return Ok();
        }

        [HttpPut]
        [Authorize]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult UpdateFriendRequest(Guid FriendUserId, bool Accepted)
        {
            FriendRequestRepository friendReqRep = new FriendRequestRepository();
            FriendsRepository friendRep = new FriendsRepository();
            UserRepository userRep = new UserRepository();
            User user = userRep.GetUserByEmail(User.Identity.Name);

            if (Accepted)
            {
                friendRep.AddUserFriend(user.Id, FriendUserId);
                friendRep.AddUserFriend(FriendUserId, user.Id);
            }

            friendReqRep.RemoveFriendRequest(FriendUserId, user.Id);

            return Ok();

        }
    }
}
