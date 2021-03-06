
const getSidebarNavItems  = () => {
  return [
    {
      title: "Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">house</i>',
    },
    {
      title: "Initiation actions",
      subtitle: "ACTIONS",
      htmlBefore: '<i class="material-icons">library_books</i>',
      to: "/initiation-action",
    },
    {
      title: "Suivi actions",
      subtitle: "SUIVI",
      htmlBefore: '<i class="material-icons">tablet_mac</i>',
      to: "/monitoring-action",
    },
    {
      title: "Validation actions",
      subtitle: "VALIDATION",
      htmlBefore: '<i class="material-icons">mobile_friendly</i>',
      to: "/action-validation",
    },
    {
      title: "Documentation",
      subtitle: "ARCHIVAGE",
      htmlBefore: '<i class="material-icons">archive</i>',
      to: "/action-archiving",
    },
    {
      title: "Sectorielles",
      subtitle: "ANALYSES",
      htmlBefore: '<i class="material-icons">edit</i>',
      to: "/action-sector",
    },
  ];
}

export default getSidebarNavItems;
