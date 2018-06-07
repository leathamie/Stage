import xml.etree.ElementTree as ET
from pprint import pprint

filePath = 'XML/Alex/010427.xml'

tree = ET.parse(filePath)
root = tree.getroot()


"""
return a string list of actors ID 
"""
def getIdActors():
    idActors = []
    for elt in root:
        print (elt.tag)
        print (type(elt))
        if (elt.tag == '{http://phon.ling.mun.ca/ns/phonbank}participants'):
            print ('we are in participant before the loop')
            for participant in elt: 
                if (participant.tag == '{http://phon.ling.mun.ca/ns/phonbank}participant'):
                    print (participant.attrib['id'])
                    idActors.append(participant.attrib['id'])
    return idActors
    
    
"""
return the total time of speech in ms in a float
"""
def getTotalSpeechDuration():
    dur = 0.0
    for elt in root:
        if (elt.tag == '{http://phon.ling.mun.ca/ns/phonbank}transcript'):
            for transcript in elt: 
                if (transcript.tag == '{http://phon.ling.mun.ca/ns/phonbank}u'):
                    for u in transcript:
                        if (u.tag == '{http://phon.ling.mun.ca/ns/phonbank}segment'):
                            dur = dur + float(u.attrib['duration'])
    print ('duration :  ' + str(dur))
    return dur

def getTotalSpeechDurationClean():
    dur = 0.0
    for elt in root:
        if (elt.tag == '{http://phon.ling.mun.ca/ns/phonbank}transcript'):
            for transcript in elt: 
                if (transcript.tag == '{http://phon.ling.mun.ca/ns/phonbank}u'):
                    if( transcript.attrib['speaker'] != 'OPE' and transcript.attrib['speaker'] != 'ENV' and transcript.attrib['speaker'] != 'TOY'):
                        for u in transcript:
                            if (u.tag == '{http://phon.ling.mun.ca/ns/phonbank}segment'):
                                dur = dur + float(u.attrib['duration']) 
    print ('duration :  ' + str(dur))
    return dur
                            
    
def convertToSec(ms):
    return ms*0.001

def convertToMins(ms):
    return convertToSec(ms)/60



getIdActors()
dur = getTotalSpeechDurationClean()
dur = convertToMins(dur)
print ('video duration in mins: ' + str(dur))


"""
for elt in root:
    print ("root loop")
    print (elt.tag)
    print (type(elt))
    print (len(elt))
    if len(elt) > 0:
        print (elt[0].tag)
"""