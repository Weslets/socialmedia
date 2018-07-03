namespace project2._4.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class friends : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.FriendRequests",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        SenderUserId = c.Guid(nullable: false),
                        RecieverUserId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.UserFriends",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        UserId = c.Guid(nullable: false),
                        FriendUserId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.UserFriends");
            DropTable("dbo.FriendRequests");
        }
    }
}
