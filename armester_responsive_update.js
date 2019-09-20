function ph_is_site_responsive(hostname)
{
    var sites = ["prohardver.hu", "mobilarena.hu", "gamepod.hu", "logout.hu", "itcafe.hu", "fototrend.hu"];
    return sites.indexOf(hostname) >= 0;
}
