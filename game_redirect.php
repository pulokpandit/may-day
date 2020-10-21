<?php
session_start();

$domain_name='nima';
if(strpos($_SERVER['HTTP_HOST'], 'dyn') !== false)
{
	$domain_name='dyn.lottosocial.com';
}
else if(strpos($_SERVER['HTTP_HOST'], 'nima') !== false)
{
	$domain_name='nima.lottosocial.com';
}
else
{
	$domain_name='lottosocial.com';
}

$session_params='cid='.$_SESSION['cid'].'&vid='.$_SESSION['vid'];

if(isset($_REQUEST['type']) && $_REQUEST['type']=='gamecenter')
{
	header('location:https://'.$domain_name.'/game/?'.$session_params);
}
else if(isset($_REQUEST['type']) && $_REQUEST['type']=='thankspage')
{
    $url='https://'.$domain_name.'/game/?'.$_SERVER['QUERY_STRING'].'&'.$session_params;
    $param='type';
    $url=removeParam($url,$param);
    header('location:'.$url);
}
else if(isset($_REQUEST['type']) && $_REQUEST['type']=='login')
{
    header('location:https://'.$domain_name.'/login/');
}
else if(isset($_REQUEST['type']) && $_REQUEST['type']=='mapgamecenter')
{
     header('location:https://'.$domain_name.'/game/?'.$session_params);
}
else if(isset($_REQUEST['type']) && $_REQUEST['type']=='opengame')
{
     header('location:https://'.$domain_name.'/');
}
else if(isset($_REQUEST['type']) && $_REQUEST['type']=='opengame_claim_prize')
{
    //$url='https://'.$domain_name.'.lottosocial.com/win-lottery-syndicates-login/?'.$_SERVER['QUERY_STRING'];
	$url='https://'.$domain_name.'/partial-registration/?'.$_SERVER['QUERY_STRING'];
    $param='type';
    $url=removeParam($url,$param);
    header('location:'.$url);
}
function removeParam($url, $param) {
    $url = preg_replace('/(&|\?)'.preg_quote($param).'=[^&]*$/', '', $url);
    $url = preg_replace('/(&|\?)'.preg_quote($param).'=[^&]*&/', '$1', $url);
    return $url;
}
?>