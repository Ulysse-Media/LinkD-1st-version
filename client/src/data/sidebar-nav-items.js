
const getSidebarNavItems  = () => {
  return [
    {
      title: "Dashboard",
      subtitle: "Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">house</i>',
    },
    {
      title: "Initiation actions",
      htmlBefore: '<i class="material-icons">library_books</i>',
      to: "/initiation-action",
    },
    {
      title: "Suivi actions",
      htmlBefore: '<i class="material-icons">tablet_mac</i>',
      to: "/monitoring-action",
    },
    {
      title: "Validation actions",
      htmlBefore: '<i class="material-icons">mobile_friendly</i>',
      to: "/action-validation",
    },
    {
      title: "Archivage actions",
      htmlBefore: '<i class="material-icons">archive</i>',
      to: "/action-archiving",
    }
  ];
}

export default getSidebarNavItems;
